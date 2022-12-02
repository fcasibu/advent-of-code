export const getLatestPuzzleDate = (date: Date = new Date()) => {
	const asUTC = new Date(
		date.getTime() + date.getTimezoneOffset() * 60 * 1000
	);
	const asEST = new Date(asUTC.getTime() - 5 * 60 * 60 * 1000);
	const isDecember = asEST.getMonth() === 11;
	const currentYear = asEST.getFullYear();
	const latestPuzzleYear = isDecember ? currentYear : currentYear - 1;
	const currentDay = asEST.getDate();
	const latestPuzzleDay = isDecember ? Math.min(currentDay, 25) : 25;
	return { day: latestPuzzleDay, year: latestPuzzleYear };
};

export const getAllPuzzleYears = (latestYear: number) => {
	const START_DATE = 2015;
	return Array.from(
		{ length: latestYear - START_DATE + 1 },
		(_, i) => START_DATE + i
	);
};

export const getReleaseTime = (latest: { day: number; year: number }) => {
	const inCurrentTZ = new Date(latest.year, 11, latest.day, 5);
	return new Date(
		inCurrentTZ.getTime() - inCurrentTZ.getTimezoneOffset() * 60 * 1000
	);
};
