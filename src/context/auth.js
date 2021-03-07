import React, { useState, useContext, useEffect } from 'react';

import { me } from '../services/user';

const AuthContext = React.createContext();
const MutateAuthContext = React.createContext();

function AuthProvider({ children }) {
	const [authState, setAuthState] = useState({
		token: localStorage.getItem('token') || null,
		user: JSON.parse(localStorage.getItem('user')) || null,
	});

	const [fetching, setFetching] = useState(true);
	const [rememberMe, setRememberMe] = useState(true);

	const updateAuthState = (newAuthState) => {
		if (rememberMe) {
			localStorage.setItem('token', newAuthState.token);
			localStorage.setItem('user', JSON.stringify(newAuthState.user));
		}
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
				localStorage.setItem('user', JSON.stringify(user));
				setAuthState({ user, token });
			} else {
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				setAuthState({ token: null, user: null });
			}
			setFetching(false);
		};
		fetchMe(token);
	}, []);

	return (
		<AuthContext.Provider value={{ ...authState, fetching, rememberMe }}>
			<MutateAuthContext.Provider value={{ updateAuthState, setRememberMe }}>
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
