import axios from 'axios';

const createPatient = async (values, token) => {
	try {
		const { data } = await axios.post(`/patients/create`, values, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return { data };
	} catch (error) {
		return { error };
	}
};

export { createPatient };
