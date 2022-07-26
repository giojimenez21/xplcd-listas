import { child, get, ref } from "firebase/database";
import { database } from "../config/firebaseConfig";
import { orderData } from "../helpers/orderData";
import { types } from "../types/types";

export const startGetListPrice = async(list) => {
    try {
        const dbRef = ref(database);
        const response = await get(child(dbRef, list));
        if(response.exists()){
            const data = orderData(response.val());
            return data;
        }
        return null;
    } catch (error) {
        console.log(error);
    }
}

export const getListPrices = (data) => ({
    type: types.getPrices,
    payload: data
});
