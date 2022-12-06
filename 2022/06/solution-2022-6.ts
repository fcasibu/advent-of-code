/**
 * • Year - ${YEAR}
 * • Day  - ${DAY}
 */

const findUniqueString = (data: string, len: number) => {
	for (let i = len; i <= data.length; i++) {
		const slice = data.slice(i - len, i);
		if (new Set(slice.split("")).size === len) return i;
	}
};

const question1 = (data: string) => {
	return findUniqueString(data, 4);
};

const question2 = (data: string) => {
	return findUniqueString(data, 14);
};

const solution = (data: string) => {
	// return question1(data);
	return question2(data);
};

export default solution;
