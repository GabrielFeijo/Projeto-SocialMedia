export const extractUserData = (
	data: (string | null)[],
	lang: 'pt' | 'en' = 'pt'
): { followers: number; following: number } => {
	const userDataString = data.join('');
	let followersRegex: RegExp;
	let followingRegex: RegExp;

	if (lang === 'pt') {
		followersRegex = /(\d+)\s+seguidores/;
		followingRegex = /(\d+)\s+conexões/;
	} else {
		followersRegex = /(\d+)\s+followers/;
		followingRegex = /(\d+)\s+following/;
	}

	const followersMatch = userDataString.match(followersRegex);
	const followingMatch = userDataString.match(followingRegex);

	const followers = followersMatch ? parseInt(followersMatch[1]) : 0;
	const following = followingMatch ? parseInt(followingMatch[1]) : 0;

	return {
		followers,
		following,
	};
};
