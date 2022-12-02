const help = () => {
	console.log(`
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
            Advent of Code - Quick TS setup
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

  » USAGE «

    • [p]npm run help
    - Displays this help message with all the details

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
`);
	process.exit();
};

export default help;
