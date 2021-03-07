import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import './assets/plugins/nucleo/css/nucleo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/scss/argon-dashboard-react.scss';

import AdminLayout from './layouts/Admin.js';
import AuthLayout from './layouts/Auth.js';

import VideoChatDoctor from './layouts/VideoChatDoctor';
import VideoChatPatient from './layouts/VideoChatPatient';

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/admin' render={(props) => <AdminLayout {...props} />} />
				<Route path='/auth' render={(props) => <AuthLayout {...props} />} />
				<Route
					path='/connect/doctor/:id'
					render={(props) => <VideoChatDoctor {...props} />}
				/>
				<Route
					path='/connect/patient/:roomName'
					render={(props) => <VideoChatPatient {...props} />}
				/>
				<Redirect from='/' to='/admin/index' />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
