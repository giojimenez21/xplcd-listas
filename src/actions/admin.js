import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { child, get, ref, set, update } from "firebase/database";
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
            available:true
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
            update(ref(database, `users/${id}`), {
                ...user,
                password: hash,
                id
            });
            return true;
        }else {
            update(ref(database, `users/${id}`), {
                id,
                username: user.username,
                role: user.role
            });
            return true;
        }
    } catch (error) {
        console.log(error);
    }
}

export const editUser = (user) => ({
    type: types.editUser,
    payload: user
});

export const startLockUser = async(id) => {
    try {
        await update(ref(database, `users/${id}`), {
            available: false
        });
        return true;
    } catch (error) {
        console.log(error);
    }
};

export const lockUser = (id) =>({
    type: types.lockUser,
    payload: id
});

export const startUnlockUser = async(id) => {
    try {
        await update(ref(database, `users/${id}`), {
            available: true
        });
        return true;
    } catch (error) {
        console.log(error);
    }
};

export const unlockUser = (id) =>({
    type: types.unlockUser,
    payload: id
});