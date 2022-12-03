/**
 * • Year - ${YEAR}
 * • Day  - ${DAY}
 */

const question1 = (data: string) => {
	return Math.max(
		...data
			.split("\n\n")
			.map(perElf =>
				perElf
					.split("\n")
					.reduce(
						(prevCount, current) => prevCount + Number(current),
						0
					)
			)
	);
};

const question2 = (data: string) => {
	return data
		.split("\n\n")
		.map(perElf =>
			perElf
				.split("\n")
				.reduce((prevCount, current) => prevCount + Number(current), 0)
		)
		.sort((a, b) => b - a)
		.slice(0, 3)
		.reduce((prevCount, current) => prevCount + current, 0);
};

const solution = (data: string) => {
	// return question1(data);
	return question2(data);
};

export default solution;
