import { join } from "path";

import { root, Store } from "./store";

const localStorage = new Store(join(root(), "config"));

export function getSessionToken() {
	const token = localStorage.getItem("sessionToken");
	if (!token)
		throw new Error(`Session token not found! 
Please run the following command:
  [p]npm run login`);
	return token;
}
