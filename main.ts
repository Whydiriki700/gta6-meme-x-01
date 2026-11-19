// gta6-meme-x-01 entry (Node 22, standard library only).
//
// The entry itself is a post on X, not this program: the meme was made in
// this session, it goes out on X from a public account with make.fun (a link
// or written out) and/or a tag of @makefunai plus the play code in its text,
// and POST.json at the repo root names the post's address. The house reads
// the post from X, takes its first picture and its text, and hands both to
// the judge. All this program has to do is hand POST.json to the grader:
// copy it from the repository into the output directory, unchanged.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const sourcePath = join(botDir, 'POST.json');
const targetPath = join(outputDir, 'POST.json');

if (!existsSync(sourcePath)) {
  console.error(`POST.json not found in ${botDir}: post the meme and fill in POST.json first.`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });

try {
  copyFileSync(sourcePath, targetPath);
} catch (err) {
  console.error(`could not copy ${sourcePath} to ${targetPath}: ${(err as Error).message}`);
  process.exit(1);
}

// A partial copy would hand the gate a broken file, so check the copy
// landed whole before calling it done.
if (statSync(targetPath).size !== statSync(sourcePath).size) {
  console.error(`copy of POST.json is incomplete: ${targetPath} does not match ${sourcePath}.`);
  process.exit(1);
}
