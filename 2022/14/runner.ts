import path from "path";
import { readFileSync } from "fs";
import { root } from "../../lib/utils/store";
import solution from "./solution-2022-14";

const YEAR = +"2022";
const DAY = +"14";

const data = readFileSync(
	path.join(root(), `${YEAR}`, `${DAY}`.padStart(2, "0"), "data.txt"),
	"utf-8"
);

console.log(`
---------------------
 • Day - ${DAY}
 • Year - ${YEAR}
---------------------

 ¶ Debug Logs [if any] -
`);

const res = solution(data);

console.log(`
=-=-=-=-=-=-=-=-=-=-=
    🎈 | Solution
=-=-=-=-=-=-=-=-=-=-=

${res}
`);
