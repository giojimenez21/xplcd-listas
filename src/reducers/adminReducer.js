import { types } from "../types/types";

const init = {
    users: [],
}

export const adminReducer = (state = init, action) => {
    switch (action.type) {
        case types.getUsers:
            return {
                ...state,
                users: action.payload
            }

        case types.createUser:
            return {
                ...state,
                ...state.users.push(action.payload)
            }

        case types.editUser:
            return {
                ...state,
                users: state.users.map(u => {
                    if(u.id === action.payload.id) {
                        return {
                            ...u,
                            username: action.payload.username,
                            role: action.payload.role
                        }
                    }
                    return u;
                })
            }

        case types.lockUser:
            return {
                ...state,
                users: state.users.map(u => {
                    if(u.id === action.payload) {
                        return {
                            ...u,
                            available: false
                        }
                    }
                    return u;
                })
            }

        case types.unlockUser:
            return {
                ...state,
                users: state.users.map(u => {
                    if(u.id === action.payload) {
                        return {
                            ...u,
                            available: true
                        }
                    }
                    return u;
                })
            }

        case types.logout:{
            return {
                ...init
            }
        }
        
        default:
            return state;
    }
}