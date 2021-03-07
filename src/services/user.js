import axios from 'axios';

const me = async (token) => {
	try {
		const { data: user } = await axios.get(`/users/me`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return { user };
	} catch (error) {
		return { error };
	}
};

const login = async ({ identifier, password }) => {
	try {
		const { data: user } = await axios.post(`/auth/local`, {
			identifier,
			password,
		});
		return { user };
	} catch (error) {
		return { error };
	}
};

export { me, login };
