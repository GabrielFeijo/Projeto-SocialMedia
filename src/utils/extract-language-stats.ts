interface LanguageStats {
	language: string;
	percentage: number;
}

export const extractLanguageStats = (
	data: (string | null)[]
): LanguageStats[] => {
	const languageStats: LanguageStats[] = [];

	for (let i = 0; i < data.length; i += 2) {
		const language = data[i] || '';
		const percentageString = data[i + 1];
		const percentage = parseFloat(percentageString!.replace('%', ''));

		languageStats.push({ language, percentage });
	}

	return languageStats;
};
