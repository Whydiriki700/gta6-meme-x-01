// Entry program for the gta6-meme-x-01 make.fun bounty (round 2).
//
// The entry itself is a meme posted on X. This repository only has to tell
// the gate where that post lives: POST.json, at the repository root, holds
// the post's URL, and this program delivers a copy of it to the output
// directory the harness reads from.
//
// Before copying, the program checks that POST.json is well formed and that
// the URL it names really is an X status URL, so a malformed pointer fails
// loudly here instead of being refused by the gate later.
//
// Node 22, standard library only. When run outside the grader, the
// MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR environment variables stand in
// for the /bot and /output directories.

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const sourcePath = join(botDir, 'POST.json');
const targetPath = join(outputDir, 'POST.json');

function fail(message: string): never {
  console.error(`gta6-meme-x-01 entry: ${message}`);
  process.exit(1);
}

// Read and parse the pointer file.
let raw: string;
try {
  raw = readFileSync(sourcePath, 'utf8');
} catch (err) {
  fail(`cannot read ${sourcePath}: ${(err as Error).message}`);
}

let pointer: unknown;
try {
  pointer = JSON.parse(raw!);
} catch (err) {
  fail(`POST.json is not valid JSON: ${(err as Error).message}`);
}

if (typeof pointer !== 'object' || pointer === null || Array.isArray(pointer)) {
  fail('POST.json must be a JSON object with a "url" field');
}

const url = (pointer as Record<string, unknown>).url;
if (typeof url !== 'string' || url.length === 0) {
  fail('POST.json must carry a non-empty string "url"');
}

// The URL has to point at a single post on x.com: /<handle>/status/<id>.
let parsed: URL;
try {
  parsed = new URL(url!);
} catch {
  fail(`"url" is not a parseable URL: ${url}`);
}

if (parsed.protocol !== 'https:' || parsed.hostname !== 'x.com') {
  fail(`"url" must be an https://x.com address, got: ${url}`);
}

const statusPath = /^\/[A-Za-z0-9_]{1,15}\/status\/\d+$/;
if (!statusPath.test(parsed.pathname)) {
  fail(`"url" must name one post (/<handle>/status/<id>), got path: ${parsed.pathname}`);
}

// Deliver the pointer to the harness.
mkdirSync(outputDir, { recursive: true });
try {
  copyFileSync(sourcePath, targetPath);
} catch (err) {
  fail(`cannot copy POST.json to ${targetPath}: ${(err as Error).message}`);
}

// Trust nothing about the copy: read the delivered file back, parse it, and
// make sure it still names the same validated post. A copy that was cut
// short or written to the wrong place fails here, not at the gate.
let deliveredUrl: unknown;
try {
  const delivered = JSON.parse(readFileSync(targetPath, 'utf8'));
  deliveredUrl = (delivered as Record<string, unknown>).url;
} catch (err) {
  fail(`the delivered POST.json at ${targetPath} does not parse: ${(err as Error).message}`);
}
if (deliveredUrl !== url) {
  fail(`the delivered POST.json names ${String(deliveredUrl)}, expected ${url}`);
}

console.log(`POST.json delivered to ${targetPath} (post: ${url})`);
