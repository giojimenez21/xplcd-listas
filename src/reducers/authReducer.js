import { types } from "../types/types";

const init = {
    logged: false,
}

export const authReducer = (state = init, action) => {
    switch (action.type) {
        case types.login:
            return {
                logged: true,
                ...action.payload
            }

        case types.logout:
            return {
                ...init
            }
    
        default:
            return state;
    }
}