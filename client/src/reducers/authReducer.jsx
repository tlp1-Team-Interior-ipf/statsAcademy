import { types } from '../types/type';

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.LOGIN:
            return {
                ...action.payload,
                isLogged: true,
            };
        case types.LOGOUT:
            return {
                isLogged: false,
            };
        default:
            return state;
    }
};