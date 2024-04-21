export const extractUserData = (
	data: (string | null)[]
): { followers: number; following: number } => {
	const userDataString = data.join('');

	const followersRegex = /(\d+)\s+followers/;
	const followingRegex = /(\d+)\s+following/;

	const followersMatch = userDataString.match(followersRegex);
	const followingMatch = userDataString.match(followingRegex);

	const followers = followersMatch ? parseInt(followersMatch[1]) : 0;
	const following = followingMatch ? parseInt(followingMatch[1]) : 0;

	return {
		followers,
		following,
	};
};
