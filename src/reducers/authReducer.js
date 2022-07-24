
const init = {
    logged: false,
}

export const authReducer = (state = init, action) => {
    switch (action.type) {
        case types.login:
            return {
                ...state,
                logged: true
            }
    
        default:
            return state;
    }
}