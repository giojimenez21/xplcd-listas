import bcrypt from 'bcryptjs';
import React, { useEffect, useReducer } from "react";
import { child, get, ref, set } from "firebase/database";
import { database } from "./config/firebaseConfig";
import { AuthContext } from "./context/AuthContext";
import { authReducer } from "./reducers/authReducer";
import { AppRouter } from "./routers/AppRouter";
import { adminReducer } from './reducers/adminReducer';
import { AdminContext } from './context/AdminContext';
import { UserContext } from './context/UserContext';
import { userReducer } from './reducers/userReducer';

export const App = () => {

    const init = () => {
        return JSON.parse(localStorage.getItem('auth')) || {
            logged: false
        }
    }
    const [user, dispatchUser] = useReducer(userReducer);
    const [admin, dispatchAdmin] = useReducer(adminReducer);
    const [auth, dispatchAuth] = useReducer(authReducer, {}, init);
    

    
    const verifyUserAdmin = async () => {
        const dbRef = ref(database);
        const response = await get(child(dbRef, `users/${import.meta.env.VITE_ADMIN_USER}`));
        
        if (!response.exists()) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(import.meta.env.VITE_PASSWORD, salt);
            set(ref(database, `users/${import.meta.env.VITE_ADMIN_USER}`), {
                username: import.meta.env.VITE_ADMIN_USER,
                password: hash,
                role: "ADMIN"
            });
            
        }
    };
    
    useEffect(() => {
        verifyUserAdmin();
    }, []);

    return (
        <AuthContext.Provider value={{ auth, dispatchAuth }}>
            <AdminContext.Provider value = {{ admin, dispatchAdmin }}>
                <UserContext.Provider value={{ user, dispatchUser}}>
                    <AppRouter />
                </UserContext.Provider>
            </AdminContext.Provider>
        </AuthContext.Provider>
    );
};
