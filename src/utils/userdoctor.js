const userdoctor = {
	confirmed: true,
	blocked: false,
	userType: 'Doctor',
	_id: '',
	username: '',
	email: '',
	provider: 'local',
	userObject: [
		{
			__component: 'user-object.doctor',
			_id: '',
			__v: 0,
			doctor: {
				department: '',
				_id: '',
				firstName: '',
				lastName: '',
				email: '',
				address: '',
				phoneNumber: '',
				age: 0,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				__v: 0,
				dob: '0000-00-00',
				hospital: '',
				id: '',
			},
			id: '',
		},
	],
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
	__v: 0,
	role: {
		_id: '',
		name: 'Authenticated',
		description: 'Default role given to authenticated user.',
		type: 'authenticated',
		__v: 0,
		id: '6041ac6b8caa2a1b70f92b29',
	},
	id: '',
};

export default userdoctor;
