import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { chromium } from "playwright";

function loadLocalEnv() {
  for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, "");
  }
}

loadLocalEnv();
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const baseUrl = process.env.E2E_BASE_URL ?? "http://localhost:3214";
if (!supabaseUrl || !serviceRoleKey || !anonKey) throw new Error("Supabase application credentials are required");

const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } });
const suffix = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
const email = `skillmap-e2e-${suffix}@example.com`;
const password = `SkillMap-${crypto.randomUUID()}-9a!`;
let userId: string | null = null;
let participantIds: string[] = [];
let browser: Awaited<ReturnType<typeof chromium.launch>> | null = null;

async function cleanup() {
  if (!userId) return;
  const { data: attempts } = await admin.from("assessment_attempts").select("id,anonymous_id").eq("student_id", userId);
  participantIds = (attempts ?? []).map((attempt) => attempt.anonymous_id).filter((value): value is string => Boolean(value));
  await admin.from("assessment_attempts").delete().eq("student_id", userId);
  if (participantIds.length) await admin.from("pilot_participants").delete().in("id", participantIds);
  await admin.auth.admin.deleteUser(userId);
}

try {
  const created = await admin.auth.admin.createUser({ email, password, email_confirm: true });
  if (created.error || !created.data.user) throw created.error ?? new Error("Temporary user was not created");
  userId = created.data.user.id;
  const authProbe = createClient(supabaseUrl, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const probe = await authProbe.auth.signInWithPassword({ email, password });
  if (probe.error) throw new Error(`Direct auth probe failed: ${probe.error.message}`);
  await authProbe.auth.signOut();
  browser = await chromium.launch({ channel: "chrome", headless: true });
  const context = await browser.newContext({ locale: "uz-UZ" });
  const page = await context.newPage();
  page.setDefaultTimeout(60_000);

  await page.goto(`${baseUrl}/uz/sign-in`, { waitUntil: "networkidle" });
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Parol", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Kirish" }).click();
  await page.waitForURL((url) => url.pathname === "/uz" || url.pathname === "/uz/assessment", { timeout: 60_000 }).catch(async () => { throw new Error(`Sign-in stayed at ${page.url()}: ${(await page.locator("body").innerText()).slice(0, 800)}`); });
  console.log("E2E_SIGN_IN=passed");

  const participant = {
    participantCode: `SM-2026-${String(Date.now()).slice(-6)}`,
    grade: 10,
    region: "Toshkent shahri",
    district: "E2E test tumani",
    schoolType: "public",
    schoolCode: "E2E",
    cohortCode: "AUTOMATED-E2E",
    englishLevel: "intermediate",
    deviceAccess: "personal",
    internetAccess: "reliable",
    programmingExperience: "less-than-year",
    careerGoal: "software-engineering",
    preferredLocale: "uz",
    consent: true,
    consentedAt: new Date().toISOString(),
    externalApprovalHandled: true,
  };
  await page.evaluate((value) => sessionStorage.setItem("skillmap-participant", JSON.stringify(value)), participant);
  const start = await page.evaluate(async () => {
    const response = await fetch("/api/attempts/state", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "start", locale: "uz", retake: false }) });
    return { status: response.status, body: await response.json() };
  });
  if (start.status !== 200 || !start.body.attemptId) throw new Error(`Attempt start failed with ${start.status}`);
  await page.goto(`${baseUrl}/uz/assessment`, { waitUntil: "networkidle" });

  for (let index = 0; index < 24; index++) {
    await page.locator("article label").first().click();
    if (index < 23) await page.getByRole("button", { name: "Keyingi" }).click();
  }
  const submitResponse = page.waitForResponse((response) => response.url().endsWith("/api/attempts/submit") && response.request().method() === "POST", { timeout: 60_000 });
  await page.getByRole("button", { name: "Natijani ko‘rish" }).click();
  const submitted = await submitResponse;
  if (!submitted.ok()) throw new Error(`Assessment submission failed with ${submitted.status()}: ${(await submitted.text()).slice(0, 500)}`);
  await page.waitForURL(/\/uz\/results/, { timeout: 60_000 });
  await page.getByRole("link", { name: "12 haftalik rejamni boshlash" }).waitFor();
  console.log("E2E_24_QUESTION_SUBMISSION=passed");

  await page.getByRole("link", { name: "12 haftalik rejamni boshlash" }).click();
  await page.waitForURL(/\/uz\/roadmap/);
  await page.locator("#three-month-title").waitFor({ timeout: 20_000 }).catch(async () => {
    throw new Error(`Three-month plan did not render at ${page.url()}: ${(await page.locator("body").innerText()).slice(0, 1000)}`);
  });
  const incomplete = page.locator('button[aria-pressed="false"]');
  if (await incomplete.count() !== 72) throw new Error(`Expected 72 roadmap tasks, received ${await incomplete.count()}`);
  const progressResponse = page.waitForResponse((response) => response.url().endsWith("/api/roadmap/progress") && response.request().method() === "POST");
  await incomplete.nth(5).click();
  if (!(await progressResponse).ok()) throw new Error("Roadmap progress API failed");
  await page.reload({ waitUntil: "networkidle" });
  if (await page.locator('button[aria-pressed="true"]').count() !== 1) throw new Error("Roadmap progress did not survive refresh");
  await page.locator("#twelve-week-plan header").getByText("1%", { exact: true }).first().waitFor();
  await page.getByText("1/6 bajarildi", { exact: false }).waitFor();
  const { count, error: progressError } = await admin.from("roadmap_task_progress").select("task_id", { count: "exact", head: true }).eq("user_id", userId);
  if (progressError || count !== 1) throw progressError ?? new Error(`Expected one persisted task, received ${count}`);
  await page.goto(`${baseUrl}/en/roadmap`, { waitUntil: "networkidle" });
  if (await page.locator('button[aria-pressed="true"]').count() !== 1) throw new Error("Roadmap progress did not survive locale switch");
  await context.clearCookies();
  await page.goto(`${baseUrl}/uz/sign-in`, { waitUntil: "networkidle" });
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Parol", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Kirish" }).click();
  await page.waitForURL((url) => url.pathname === "/uz" || url.pathname === "/uz/assessment", { timeout: 60_000 }).catch(async () => { throw new Error(`Re-login stayed at ${page.url()}: ${(await page.locator("body").innerText()).slice(0, 800)}`); });
  await page.goto(`${baseUrl}/uz/roadmap`, { waitUntil: "networkidle" });
  if (await page.locator('button[aria-pressed="true"]').count() !== 1) throw new Error("Roadmap progress did not survive logout/login");
  await page.goto(`${baseUrl}/uz`, { waitUntil: "networkidle" });
  await page.getByRole("link", { name: "Davom ettirish" }).waitFor();
  await page.getByRole("link", { name: "Natijalarni ko‘rish" }).waitFor();
  await page.getByRole("link", { name: "Uzoq muddatli CS yo‘li" }).waitFor();
  console.log("E2E_ROADMAP_72_TASKS=passed");
  console.log("E2E_PROGRESS_REFRESH=passed");
  console.log("E2E_PROGRESS_LOCALE_SWITCH=passed");
  console.log("E2E_PROGRESS_RELOGIN=passed");
  console.log("E2E_RETURNING_DASHBOARD=passed");
} finally {
  await browser?.close();
  await cleanup();
  console.log("E2E_CLEANUP=passed");
}
