import { child, get, ref } from "firebase/database";
import { database } from "../config/firebaseConfig";

export const existUser = async(username) => {
    try {
        const dbRef = ref(database);
        const response = await get(child(dbRef, 'users'));
        if(response.exists()) {
            const users = Object.values(response.val());
            console.log(users);
            if(users.find(u => u.username === username)){
                return true;
            }
            return false;
        }
        return false;
    } catch (error) {
        console.log(error)
    }
}