<p align="center">
  <a href="https://github.com/Lofty-Brambles/advent-of-code">
    <img src="./lib/images/logo.png" alt="Logo" width=72 height=72>
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
<!-- -   [Bugs and feature requests](#bugs-and-feature-requests)
-   [Contributing](#contributing)
-   [Creators](#creators) -->
-   [Thanks](#thanks)
<!-- -   [Copyright and license](#copyright-and-license) -->

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
├── config/ [generated]
│   └── sessionToken/ [generated]
├── lib/
│   ├── images/
│   │   └── logo.png
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

<!-- ## Bugs and feature requests

Have a bug or a feature request? Please first read the [issue guidelines](https://reponame/blob/master/CONTRIBUTING.md) and search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://reponame/issues/new).

## Contributing

Please read through our [contributing guidelines](https://reponame/blob/master/CONTRIBUTING.md). Included are directions for opening issues, coding standards, and notes on development.

Moreover, all HTML and CSS should conform to the [Code Guide](https://github.com/mdo/code-guide), maintained by [Main author](https://github.com/usernamemainauthor).

Editor preferences are available in the [editor config](https://reponame/blob/master/.editorconfig) for easy use in common text editors. Read more and download plugins at <https://editorconfig.org/>.

## Creators

**Creator 1**

-   <https://github.com/usernamecreator1> -->

## Thanks

Some Text

## Copyright and license

Code and documentation copyright 2011-2018 the authors. Code released under the [MIT License](https://reponame/blob/master/LICENSE).

Enjoy :metal:
