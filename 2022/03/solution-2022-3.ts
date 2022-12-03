/**
 * • Year - ${YEAR}
 * • Day  - ${DAY}
 */

const letterPriority = new Map<string, number>(
	Array.from({ length: 52 }, (_, i) => [
		String.fromCharCode(i < 26 ? i + 97 : i + /* 65 - 26 */ 39),
		i + 1,
	])
);

const question1 = (data: string) => {
	return data
		.split("\n")
		.map(bag => {
			const mid = Math.floor(bag.length / 2);
			const mapOfCompartment1 = new Map<string, number>(
				bag
					.slice(0, mid)
					.split("")
					.map(letter => [letter, 0])
			);

			for (const letter of bag.slice(mid).split(""))
				if (mapOfCompartment1.get(letter) !== undefined)
					return letterPriority.get(letter);
		})
		.reduce((prevSum, current) => Number(prevSum) + Number(current), 0);
};

/**
const question2 = (data: string) => {
	return data.split("\n").reduce(
		(tally, currentTag) => {
			if (tally.temp.length === 3) {
				const [first, ...rest] = tally.temp;
				const mid = Math.floor(first.length / 2);
				const mapOfBag1 = new Map<string, number>(
					first
						.slice(0, mid)
						.split("")
						.map(letter => [letter, 0])
				);

				for (const bag of rest)
					for (const letter of bag) {
						const val = mapOfBag1.get(letter);
						if (val === 1)
							return {
								score:
									tally.score + letterPriority.get(letter)!,
								temp: [],
							};
						if (val === 0) mapOfBag1.set(letter, val + 1);
					}
			}

			tally.temp.push(currentTag);
			return tally;
		},
		{ score: 0, temp: [] } as { score: number; temp: string[] }
	).score;
};
 */
// FOR SOME REASON, 299 % 3 !== 2 for this damned script

const question2 = (data: string) => {
	const content: string[] = data.split("\n");
	const threePairs: string[][] = [];
	for (let i = 0; i < content.length; i = i + 3) {
		threePairs.push([content[i], content[i + 1], content[i + 2]]);
	}

	const fetchCommon = threePairs.map(threepair => {
		for (const letter of threepair[0])
			if (threepair.every(ele => ele.includes(letter))) return letter;
	});

	return fetchCommon
		.map(letter => letterPriority.get(letter!))
		.reduce((prevSum, current) => Number(prevSum) + Number(current), 0);
};

const solution = (data: string) => {
	// return question1(data);
	return question2(data);
};

export default solution;
