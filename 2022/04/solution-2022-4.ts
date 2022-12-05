/**
 * • Year - ${YEAR}
 * • Day  - ${DAY}
 */

const question1 = (data: string) => {
	return data
		.split("\n")
		.map(pair => {
			const [range1, range2] = pair
				.split(",")
				.map(range => range.split("-"));
			if (+range1[0] >= +range2[0] && +range1[1] <= +range2[1]) return 1;
			if (+range1[0] <= +range2[0] && +range1[1] >= +range2[1]) return 1;
			return 0;
		})
		.reduce(
			(prevSum, current) => Number(prevSum) + Number(current),
			0 as number
		);
};

const question2 = (data: string) => {
	return data
		.split("\n")
		.map(pair => {
			const [range1, range2] = pair
				.split(",")
				.map(range => range.split("-"));
			if (+range1[0] <= +range2[1] && +range1[1] >= +range2[0]) return 1;
			return 0;
		})
		.reduce(
			(prevSum, current) => Number(prevSum) + Number(current),
			0 as number
		);
};

const solution = (data: string) => {
	// return question1(data);
	return question2(data);
};

export default solution;
