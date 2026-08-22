import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
  if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, "");
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("Supabase server credentials are required");

const admin = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
const callback = "https://skillmap-flax.vercel.app/uz/auth/callback";
let userId: string | undefined;

try {
  const generated = await admin.auth.admin.generateLink({
    type: "signup",
    email: `skillmap-redirect-check-${Date.now()}@example.com`,
    password: `Tmp-${crypto.randomUUID()}-9a!`,
    options: { redirectTo: callback },
  });
  if (generated.error) throw generated.error;
  userId = generated.data.user?.id;
  const action = new URL(generated.data.properties.action_link);
  const redirect = action.searchParams.get("redirect_to");
  console.log(`AUTH_CALLBACK_MATCH=${redirect === callback}`);
  console.log(`AUTH_CALLBACK_HOST=${redirect ? new URL(redirect).host : "missing"}`);
} finally {
  if (userId) {
    await admin.auth.admin.deleteUser(userId);
    console.log("AUTH_REDIRECT_TEST_CLEANUP=passed");
  }
}
