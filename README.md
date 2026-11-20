# gta6-meme-x-01: entry pointer for a GTA 6 meme on X

[![bounty](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/Whydiriki700/gta6-meme-x-01/rank.svg)](https://make.fun/bounty/gta6-meme-x-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/Whydiriki700/gta6-meme-x-01/reward.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)

This repository holds the entry for the make.fun bounty
[gta6-meme-x-01](https://make.fun/bounty/gta6-meme-x-01), a competition
that pays USDC to the best GTA 6 memes posted on X.

In this bounty there is no app and no build to grade in the repository.
The meme itself lives in a public post on X, and make.fun reads the post
directly from X: its picture and its text are what get judged. All this
repository does is name that post.

The post for this round:

https://x.com/rikiwahyudi8o/status/2123638256210522583

## What is in here

- `POST.json` names the entry post, as a single object:
  `{"url": "https://x.com/rikiwahyudi8o/status/2123638256210522583"}`
- `main.ts` is the entry program (Node 22, standard library only). It
  validates POST.json, checks that the URL is an x.com status URL, and
  copies the file into the output directory the grader reads. To run it
  the way the grader does:

      mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

- `LICENSE` is the MIT license for the code in this repository.

## Referral

Entering make.fun bounties yourself? You can join with my referral link:
https://make.fun/r/vwpycztt
