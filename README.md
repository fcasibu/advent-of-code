<p align="center">
  <a href="https://github.com/Lofty-Brambles/advent-of-code">
    <img src="https://raw.githubusercontent.com/Lofty-Brambles/advent-of-code/main/.github/images/logo.png" alt="Logo" width=72 height=72>
  </a>

  <h3 align="center">Advent of Code - TS/JS manager!</h3>

  <p align="center">
    This is a script repository for all of my Advent of Code solutions!
    <br>
    <a href="https://github.com/Lofty-Brambles/advent-of-code/issues/new">Report bug</a>
    ·
    <a href="https://github.com/Lofty-Brambles/advent-of-code/compare">Request feature</a>
  </p>
</p>

## Table of contents

-   [Quick start](#quick-start)
-   [Status](#status)
-   [What's included](#whats-included) - [Planned Features](#planned-features)
-   [Contributors](#contributers)
-   [Copyright and license](#copyright-and-license)

## Quick start

This repository is meant to be used as a quick setup for [The Advent of Code](https://adventofcode.com/) event each year!

-   Create a fork of this repository, and clone it.

```bash
git clone [link]
```

-   Install all of the project dependencies with npm, or better yet, pnpm.

```bash
cd advent-of-code
npm i
```

-   You can now access all the features. Try out `npm run help` for info. You should get the following outputs.

```txt
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
            Advent of Code - Quick TS setup
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

  » USAGE «

    • [p]npm run help
    - Displays this help message with all the details

    • [p]npm run login
    - Starts up an interactive wizard for session login to the website

    • [p]npm run fetch
    - Fetches the question data from the website
      ↳ Options:
        * pnpm run fetch --year 20xy
        - Fetches the question data for that year

        * pnpm run fetch --fetchAll
        - Fetches the question data for ALL the prior years

        * pnpm run fetch --wait
        - Runs a script to fetch the latest question data

        * pnpm run fetch --no-runner
        - Blocks a runner script from being generated for the data
```

-   Feel free to adjust the cofiguration, scripts, prettier setup etc. as you like!

## Status

**This project is still in ALPHA.**
There are a ton of changes planned in the future, so stay tuned. Most changes will be backward-compatible, and if any breaking changes occur, they will be announced.

### Planned Features

-   Better scraping with puppeteer, fixing auto-login with headless_chrome.
-   A submission script to automatically manage cooldown and submit.
-   Performance manager to keep track of the solutions.

## What's included

A project is usually like this:

```text
advent-of-code/
├── .github/
│   └── images/
│       └── logo.png
├── config/ [generated]
│   └── sessionToken/ [generated]
├── lib/
│   ├── scripts/
│   │   ├── fetch.ts
│   │   ├── genFile.ts
│   │   ├── genRunner.ts
│   │   ├── help.ts
│   │   └── login.ts
│   ├── templates/
│   │   ├── runner.ts.dat
│   │   └── solution.ts.dat
│   ├── utils/
│   │   ├── customReplaceAll.ts
│   │   ├── getPuzzleDate.ts
│   │   ├── getToken.ts
│   │   ├── store.ts
│   │   └── templateFetcher.ts
│   └── main.ts
├── node_modules/
├── .gitignore
├── package.json
├── .prettierrc
├── README.md
├── LICENSE.md
└── tsconfig.json
```

## Contributers

-   [Lofty Brambles](https://github.com/Lofty-Brambles/)

## Copyright and license

Code and documentation copyright 2022 - Lofty Brambles and contributors.
Code released under the [MIT License](https://github.com/Lofty-Brambles/advent-of-code/blob/master/LICENSE).

Enjoy :metal:
