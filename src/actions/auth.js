import bcrypt from 'bcryptjs';  
import Swal from "sweetalert2";
import { child, get, ref } from "firebase/database";
import { database } from "../config/firebaseConfig";
import { types } from '../types/types';

export const startLogin = async({username, password}) => {
    try {
        const dbRef = ref(database);
        const response = await get(child(dbRef, 'users'));
        if (!response.exists()) {
            Swal.fire('Error', "No existe algun usuario con ese nombre.","error");
            return null;
        }

        const users = Object.values(response.val()).filter(u => u.username === username);

        if(users.length === 0){
            Swal.fire('Error', "No existe algun usuario con ese nombre.","error");
            return null;
        }
        const { username:userDB, role, password:passDB } = users[0];

        if(!bcrypt.compareSync(password, passDB)){
            Swal.fire('Error', "Contraseña incorrecta","error");
            return null;
        }
        localStorage.setItem("auth", JSON.stringify({
            username,
            logged: true,
            role
        }));

        return {
            username,
            role
        }
        
    } catch (error) {
        console.log(error);
    }
}

export const login = (user) => ({
    type: types.login,
    payload: user
});

export const logout = () => ({
    type: types.logout
});