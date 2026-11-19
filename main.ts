// Entry program for make.fun's gta6-meme-x-01 bounty (Node 22, no deps).
//
// What is being entered is not code but a post on X: a GTA 6 meme whose
// picture and text the house reads from X directly. This repository's one
// job is to name that post, which it does in POST.json at the repo root,
// and to hand that file to the grader. So this program copies POST.json
// from the bot directory into the output directory, byte for byte, and
// does nothing else: no network, no clock, nothing outside those two
// directories, and the same input always yields the same output.
//
// In the grader the bot directory is /bot and the output directory is
// /output. MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR override both, which
// is how a local run is done:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

function fail(message: string): never {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const source = join(botDir, "POST.json");
const destination = join(outputDir, "POST.json");

// Read the source first: if POST.json is missing or unreadable there is
// nothing worth copying, and failing here beats failing mid-copy.
let payload: Buffer;
try {
  payload = readFileSync(source);
} catch {
  fail(`cannot read ${source}: POST.json belongs at the repository root`);
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, destination);

// A truncated or altered copy would name the wrong post, or none at all,
// so read the copy back and hold it against the bytes read at the start
// before reporting success.
const landed = readFileSync(destination);
if (!landed.equals(payload)) {
  fail(`the copy at ${destination} does not match ${source} byte for byte`);
}

console.log(`main.ts: handed POST.json (${payload.length} bytes) to ${destination}, verified byte for byte`);
