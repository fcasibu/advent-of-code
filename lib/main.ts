#!/usr/bin/env node

import help from "./scripts/help";
import login from "./scripts/login";
import fetch from "./scripts/fetch";

const script = async () => {
	switch (process.argv[2]) {
		case "help":
			help();
			break;
		case "login":
			await login();
			break;
		case "fetch":
			await fetch();
			break;
	}
};

try {
	script();
} catch (e) {
	console.log(`
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
      🌋 | Oh NO! Something went wrong!
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

${(e as Error).message}
`);
	process.exit();
}
