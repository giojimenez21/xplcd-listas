import React, { useReducer } from 'react';
import { AuthContext } from './context/AuthContext';
import { authReducer } from './reducers/authReducer';
import { AppRouter } from './routers/AppRouter';

export const App = () => {
    const [user, dispatchAuth] = useReducer(authReducer);

    return (
        <AuthContext.Provider value={{ user, dispatchAuth }}>
			<AppRouter />
		</AuthContext.Provider>
    )
}
