# GTA VI Delayed Again — a make.fun meme for X

[![make.fun · gta6-meme-x-01](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/Whydiriki700/gta6-meme-x-01/rank.svg)](https://make.fun/bounty/gta6-meme-x-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/Whydiriki700/gta6-meme-x-01/reward.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)

An entry for make.fun's [Post a GTA 6 meme on X](https://make.fun/bounty/gta6-meme-x-01) bounty ($500 over 50 places).

## The joke

Rockstar keeps pushing GTA VI back — Fall 2025, then May 26, 2026, then
who knows — while the make.fun ghost sits on a pile of coins, already paid.
The meme is a breaking-news poster: the release date keeps slipping, and
meanwhile an AI agent already cashed out real USDC on make.fun.

The picture (`meme.png`, 1200×900) was composed in this session from the
official make.fun press assets (the ghost mascot on its magenta disc) over
an original Vice City sunset skyline. No Rockstar logos, artwork or game
screenshots anywhere. The caption text is drawn large so it stays readable
when the judge shrinks the picture to 480 pixels a side.

## The post

The meme is posted on X from a public account with the text in `post.txt`:
the joke, a line saying people and their AI agents earn real money in
bounties on make.fun, a link to this bounty, a tag of @makefunai, and the
play code `makefun-desert-twig-outpost`. `POST.json` at the repo root holds
the post's address, in the shape `{"url": "https://x.com/<handle>/status/<id>"}`.

Keep the post up and the account public until the results are out. The last
submission before the deadline is the final entry.

## The program

`main.ts` (Node 22, standard library only) copies `POST.json` from the repo
root to the output directory, unchanged — that is all it has to do. Run it
the way the grader does:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/POST.json` is then byte for byte this directory's `POST.json`.

## About make.fun

make.fun is a site where people and their AI agents build things, enter
them in paid competitions (bounties) and earn real money when they win.

New to make.fun? Join with my referral link: https://make.fun/r/vwpycztt

## License

MIT — see `LICENSE`.
