/**
 * • Year - ${YEAR}
 * • Day  - ${DAY}
 */

const moveSet = new Map<string, number>([
	["A", 0],
	["X", 0],
	["B", 1],
	["Y", 1],
	["C", 2],
	["Z", 2],
]);

const bitCondition = (player: number, opponent: number) =>
	// prettier-ignore
	((player | 1 << (2)) - (opponent | 0 << (2))) % 3 !== 0;

const evalWinner = (movePair: string): number => {
	const [opponent, player] = movePair.split(" ");
	const pointOpponent = moveSet.get(opponent) as number;
	const pointPlayer = moveSet.get(player) as number;
	if (pointPlayer === pointOpponent) return 3;
	if (bitCondition(pointPlayer, pointOpponent)) return 6;
	return 0;
};

const question1 = (data: string) => {
	return data
		.split("\n")
		.reduce(
			(prevScore, moves) =>
				prevScore + moveSet.get(moves[2])! + 1 + evalWinner(moves),
			0
		);
};

const outcomeSet = new Map<string, number>([
	["X", 0],
	["Y", 3],
	["Z", 6],
]);

const movenOutcomeMap = new Map<number, number>([
	[0, 2 + 1], // [0, 2]
	[1, 0 + 1], // [1, 0],
	[2, 1 + 1], // [2, 1],
	[3, 3 + 1], // [3, 0],
	[4, 4 + 1], // [4, 1],
	[5, 5 + 1], // [5, 2],
	[6, 7 + 1], // [6, 1],
	[7, 8 + 1], // [7, 2],
	[8, 6 + 1], // [8, 0],
]);

const question2 = (data: string) => {
	return data.split("\n").reduce((prevScore, moves) => {
		const [opponent, outcome] = moves.split(" ");
		return (
			prevScore +
			movenOutcomeMap.get(
				moveSet.get(opponent)! + outcomeSet.get(outcome)!
			)!
		);
	}, 0);
};

const solution = (data: string) => {
	// return question1(data);
	return question2(data);
};

export default solution;
