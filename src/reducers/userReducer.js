import { types } from "../types/types";

const init = {
    priceList: [],
}

export const userReducer = (state = init, action) => {
    switch (action.type) {
        case types.getPrices: {
            return {
                ...state,
                priceList: action.payload
            }
        }

        case types.logout : {
            return {
                ...init
            }
        }
        default:
            return state;
    }
}