import path from "path";
import puppeteer from "puppeteer-core";
import { prompt } from "enquirer";
import { root, Store } from "../utils/store";

type authType = "GitHub" | "Google" | "Twitter" | "Reddit";
const authGuys = ["GitHub", "Google", "Twitter", "Reddit"];

const store = new Store(path.join(root(), "config"));

const getAuthToken = async (provider: authType): Promise<string> => {
	const browser = await puppeteer.launch({
		channel: "chrome",
	});
	const page = await browser.newPage();

	await page.goto(`https://adventofcode.com/auth/${provider.toLowerCase()}`);
	await page.waitForNavigation({ timeout: 0 });

	const cookies = await page.cookies();
	const authCookie = cookies.find(
		c => c.name === "session" && c.domain.includes("adventofcode.com")
	);
	browser.close();

	if (authCookie === undefined)
		throw new Error(`The authetication cookie was not found!
Please be sure to be logged in before using this method, or use the manual mode.
`);
	return authCookie?.value.trim();
};

const login = async () => {
	console.log(`
=-=-=-=-=- This is the Authetication prompt!  -=-=-=-=-=

  • Quick-start mode - [BUGGED, please use the manual method.]
     Automatically opens up a prompt and gets the cookie, storing it in config.txt
  • Manual mode - 
     Prompts for the session cookie and sets it in config.txt	

- NOTE: 
   The details get stored in the config.txt file.
   Make sure to NEVER commit this file. [It is automatically git-ignored by default]	
`);

	const typeOfAuth = (await prompt({
		type: "select",
		name: "mode",
		message: "To continue, please select an option...",
		choices: ["Quick-start mode", "Manual mode"],
	})) as { mode: string };

	let token: string | undefined = undefined;

	switch (typeOfAuth.mode) {
		case "Quick-start mode":
			const providerType = (await prompt({
				type: "select",
				name: "provider",
				message: "",
				choices: authGuys,
			})) as { provider: authType };

			token = (await getAuthToken(providerType.provider)).trim();
			break;
		case "Manual mode":
			console.log(`
Please follow the instructions below and enter your session token.
  1) Go to https://adventofcode.com/auth/login on your browser.
  3) On the login page, complete the authetication using any of the auth provider.
  2) Open your browser's developer tools and switch to the network tab.
  4) Now, when logged in, look for a network request starting with "callback?" - click on it.
  5) Under Response headers, find the "set-cookie" header and look for a string starting with "session=".
  6) Paste everything after "session=" until the semicolon into the prompt below.
`);

			token = (
				(await prompt({
					type: "input",
					name: "token",
					message: "Please enter your token -",
				})) as { token: string }
			).token.trim();
			break;
	}

	if (token) store.setItem("sessionToken", token);
	console.log("✅ | Token has been added successfully!");

	process.exit();
};

export default login;
