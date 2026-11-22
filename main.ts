import { copyFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(fileURLToPath(import.meta.url));
const sourceFile = join(rootDir, "POST.json");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const targetFile = join(outputDir, "POST.json");

try {
  await mkdir(outputDir, { recursive: true });
  await copyFile(sourceFile, targetFile);
} catch (error) {
  const reason = error instanceof Error ? error.message : String(error);
  console.error(`Failed to copy POST.json from ${sourceFile}: ${reason}`);
  process.exit(1);
}

console.log(`Done: POST.json copied from ${sourceFile} to ${targetFile}`);
