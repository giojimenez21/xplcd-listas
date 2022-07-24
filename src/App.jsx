import bcrypt from 'bcryptjs';
import React, { useEffect, useReducer } from "react";
import { child, get, ref, set } from "firebase/database";
import { database } from "./config/firebaseConfig";
import { AuthContext } from "./context/AuthContext";
import { authReducer } from "./reducers/authReducer";
import { AppRouter } from "./routers/AppRouter";

export const App = () => {
    const [user, dispatchAuth] = useReducer(authReducer);
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
        <AuthContext.Provider value={{ user, dispatchAuth }}>
            <AppRouter />
        </AuthContext.Provider>
    );
};
