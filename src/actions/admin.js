import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { child, get, ref, set } from "firebase/database";
import { database } from "../config/firebaseConfig";
import { types } from "../types/types";

export const startGetUsers = async () => {
    try {
        const dbRef = ref(database);
        const response = await get(child(dbRef, "users"));
        if (response.exists()) {
            return Object.values(response.val());
        }
    } catch (error) {
        console.log(error);
    }
};

export const getUsers = (users) => ({
    type: types.getUsers,
    payload: users,
});

export const startCreateUser = (user) => {
    try {
        const id = uuidv4();
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        set(ref(database, `users/${id}`), {
            id,
            username: user.username,
            password: hash,
            role: user.role,
        });
        return true;
    } catch (error) {
        console.log(error);
    }
};

export const createUser = (user) => ({
    type: types.createUser,
    payload:user
});

export const startEditUser = (user, id) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        if(user.password !== "") {
            const hash = bcrypt.hashSync(user.password, salt);
            set(ref(database, `users/${id}`), {
                ...user,
                password: hash,
                id
            });
            return true;
        }
        set(ref(database, `users/${id}`), {
            ...user,
            id
        });
        return true;

    } catch (error) {
        console.log(error);
    }
}

export const editUser = (user) => ({
    type: types.editUser,
    payload: user
});