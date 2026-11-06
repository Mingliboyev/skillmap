import { learningResources } from "../lib/learning-resources";

const failures: string[] = [];

async function checkResource(resource: (typeof learningResources)[number]) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);
  try {
    const response = await fetch(resource.url, {
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "SkillMap resource verifier/1.0" },
    });
    if (!response.ok && response.status !== 403) failures.push(`${resource.id}: HTTP ${response.status} (${resource.url})`);
    await response.body?.cancel();
  } catch (error) {
    failures.push(`${resource.id}: ${error instanceof Error ? error.message : String(error)} (${resource.url})`);
  } finally {
    clearTimeout(timeout);
  }
}

for (let index = 0; index < learningResources.length; index += 8) {
  await Promise.all(learningResources.slice(index, index + 8).map(checkResource));
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Verified ${learningResources.length} learning-resource URLs.`);
}
