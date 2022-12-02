export function customReplaceAll(
	str: string,
	replacements: { [search: string]: string }
) {
	for (const entry of Object.entries(replacements)) {
		str = str.split(entry[0]).join(entry[1]);
	}
	return str;
}
