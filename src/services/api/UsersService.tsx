import axios, { AxiosError } from 'axios';

const findGithubUser = async (name: string) => {
	try {
		const { data } = await axios.get(`https://api.github.com/users/${name}`);

		if (data) {
			return data;
		}
		return new Error('Erro ao buscar Usuário');
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return new Error(error.message);
		} else {
			return new Error('Erro ao buscar Usuário');
		}
	}
};

export const UserService = {
	findGithubUser,
};
