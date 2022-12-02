import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { root } from "./store";

export const templateFetcher = (template: string) => {
	const route = join(root(), "lib", "templates", template);
	return existsSync(route)
		? { data: readFileSync(route, "utf-8"), path: route }
		: undefined;
};
