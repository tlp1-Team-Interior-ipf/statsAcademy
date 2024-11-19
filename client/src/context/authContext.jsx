import React, { createContext, useReducer, useEffect } from 'react';
import { authReducer } from '../reducers/authReducer';
import { authService } from '../services/authService';
import { types } from '../types/type';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, dispatch] = useReducer(authReducer, {}, () => {
        const token = authService.getToken();
        return token ? { ...token, isLogged: true } : { isLogged: false };
    });

    useEffect(() => {
        if (user.isLogged === true) {
            authService.setToken(user);
        } else {
            authService.removeToken();
        }
    }, [user]);

    const login = async (credentials) => {
        try {
            const data = await authService.login(credentials);
            dispatch({
                type: types.LOGIN,
                payload: data,
            });
        } catch (error) {
            console.error('Login error', error);
        }
    };

    const logout = () => {
        authService.logout();
        dispatch({
            type: types.LOGOUT,
        });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};