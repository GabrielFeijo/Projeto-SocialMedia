interface GitHubStats {
	totalStars: number;
	totalCommits: number;
	totalPRs: number;
	totalIssues: number;
	contributedTo: number;
}

export const extractGitHubStats = (data: (string | null)[]): GitHubStats => {
	const stats: GitHubStats = {
		totalStars: 0,
		totalCommits: 0,
		totalPRs: 0,
		totalIssues: 0,
		contributedTo: 0,
	};

	const regexPatterns: { [key: string]: RegExp } = {
		totalStars: /Total Stars:\s+(\d+)/,
		totalCommits: /Total Commits \(\d+\):\s+(\d+)/,
		totalPRs: /Total PRs:\s+(\d+)/,
		totalIssues: /Total Issues:\s+(\d+)/,
		contributedTo: /Contributed to:\s+(\d+)/,
	};

	data.forEach((item) => {
		for (const [key, regex] of Object.entries(regexPatterns)) {
			const match = item?.match(regex);
			if (match) {
				stats[key as keyof GitHubStats] = parseInt(match[1]);
				break;
			}
		}
	});

	return stats;
};
