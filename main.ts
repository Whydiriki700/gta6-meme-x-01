// gta6-meme-x-01 ronde 3 - submit X post URL from POST.json
import { readFileSync, copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

function fail(message: string): never {
  console.error(`Error: ${message}`);
  process.exit(1);
}

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const sourcePath = join(botDir, "POST.json");

let raw: string;
try {
  raw = readFileSync(sourcePath, "utf8");
} catch (err) {
  fail(`failed to read POST.json from bot directory: ${(err as Error).message}`);
}

let parsed: unknown;
try {
  parsed = JSON.parse(raw);
} catch (err) {
  fail(`failed to parse POST.json: ${(err as Error).message}`);
}

if (
  typeof parsed !== "object" ||
  parsed === null ||
  Array.isArray(parsed) ||
  typeof (parsed as { url?: unknown }).url !== "string" ||
  (parsed as { url: string }).url.length === 0
) {
  fail(`POST.json must be an object with a non-empty string "url" field`);
}

const url = (parsed as { url: string }).url;

let parsedUrl: URL;
try {
  parsedUrl = new URL(url);
} catch {
  fail(`url is not a valid URL: ${url}`);
}

if (parsedUrl.protocol !== "https:") {
  fail(`url must use https: protocol`);
}

if (parsedUrl.hostname !== "x.com") {
  fail(`url hostname must be exactly x.com`);
}

const pathPattern = /^\/[A-Za-z0-9_]{1,15}\/status\/[0-9]+$/;
if (!pathPattern.test(parsedUrl.pathname)) {
  fail(`url path must match /<handle>/status/<id>`);
}

try {
  mkdirSync(outputDir, { recursive: true });
} catch (err) {
  fail(`failed to create output directory: ${(err as Error).message}`);
}

const destPath = join(outputDir, "POST.json");
try {
  copyFileSync(sourcePath, destPath);
} catch (err) {
  fail(`failed to copy POST.json to output directory: ${(err as Error).message}`);
}

let copiedRaw: string;
try {
  copiedRaw = readFileSync(destPath, "utf8");
} catch (err) {
  fail(`failed to read back copied POST.json: ${(err as Error).message}`);
}

let copiedParsed: unknown;
try {
  copiedParsed = JSON.parse(copiedRaw);
} catch (err) {
  fail(`failed to parse copied POST.json: ${(err as Error).message}`);
}

const copiedUrl =
  typeof copiedParsed === "object" && copiedParsed !== null
    ? (copiedParsed as { url?: unknown }).url
    : undefined;

if (copiedUrl !== url) {
  fail(`copied POST.json url does not match validated url`);
}

console.log(`Submitted post: ${url}`);
