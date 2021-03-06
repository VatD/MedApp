import React, { useState, useContext, useEffect } from 'react';

import { me } from '../services/user';

const AuthContext = React.createContext();
const MutateAuthContext = React.createContext();

function AuthProvider({ children }) {
	const [authState, setAuthState] = useState({
		user: null,
		token: null,
	});

	const [fetching, setFetching] = useState(true);

	const updateAuthState = (newAuthState) => {
		localStorage.setItem('token', newAuthState.token);
		setAuthState(newAuthState);
	};

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			setFetching(false);
			return;
		}
		const fetchMe = async (token) => {
			const { user } = await me(token);
			if (user) {
				setAuthState({ user, token });
			} else {
				localStorage.removeItem('token');
			}
			setFetching(false);
		};
		fetchMe(token);
	}, []);

	return (
		<AuthContext.Provider value={{ ...authState, fetching }}>
			<MutateAuthContext.Provider value={updateAuthState}>
				{children}
			</MutateAuthContext.Provider>
		</AuthContext.Provider>
	);
}

const useAuthContext = () => {
	return useContext(AuthContext);
};

const useMutateAuthContext = () => {
	return useContext(MutateAuthContext);
};

export { AuthProvider, useAuthContext, useMutateAuthContext };
