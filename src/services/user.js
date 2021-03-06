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

export { me };
