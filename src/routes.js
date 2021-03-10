import Index from './views/Index.js';
import Profile from './views/examples/Profile.js';
import Login from './views/examples/Login.js';
import AddPatient from './views/examples/AddPatient.js';

var routes = [
	{
		path: '/profile',
		name: 'Profile',
		icon: 'ni ni-single-02 text-yellow',
		component: Profile,
		layout: '/admin',
	},
	{
		path: '/patients',
		name: 'View Patients',
		icon: 'ni ni-tv-2 text-primary',
		component: Index,
		layout: '/admin',
	},
	{
		path: '/addpatient',
		name: 'Add Patient',
		icon: 'fas fa-user-plus text-red',
		component: AddPatient,
		layout: '/admin',
	},
	{
		path: '/login',
		name: 'Login',
		icon: 'ni ni-key-25 text-info',
		component: Login,
		layout: '/auth',
	},
];
export default routes;
