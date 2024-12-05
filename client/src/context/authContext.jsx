import React, { createContext, useReducer, useEffect, useRef, useState } from 'react';
import { authReducer } from '../reducers/authReducer';
import { authService } from '../services/authService';
import { types } from '../types/type';
import createActivityDetector from 'activity-detector';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, dispatch] = useReducer(authReducer, {}, () => {
        const token = authService.getToken();
        return token ? { ...token, isLogged: true } : { isLogged: false };
    });

    const [activeTime, setActiveTime] = useState(() => {
        const savedTime = localStorage.getItem('activeTime');
        return savedTime ? parseInt(savedTime, 10) : 0;
    }); // Tiempo total en segundos
    const [isActive, setIsActive] = useState(true); // Estado de actividad del usuario
    const intervalRef = useRef(null);
    const detectorRef = useRef(null);

    useEffect(() => {
        if (user.isLogged === true) {
            authService.setToken(user);
        } else {
            authService.removeToken();
        }
    }, [user]);

    // Configura el detector de actividad
    useEffect(() => {
        detectorRef.current = createActivityDetector({
            timeToIdle: 10000, // Tiempo para detectar inactividad (10s)
        });

        detectorRef.current.on('active', () => setIsActive(true));
        detectorRef.current.on('idle', () => setIsActive(false));

        return () => {
            detectorRef.current.stop();
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    // Incrementa el tiempo activo
    useEffect(() => {
        if (isActive) {
            intervalRef.current = setInterval(() => {
                setActiveTime((prevTime) => {
                    const newTime = prevTime + 1;
                    localStorage.setItem('activeTime', newTime);
                    return newTime;
                });
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive]);

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
        <AuthContext.Provider value={{ user, login, logout, activeTime, isActive }}>
            {children}
        </AuthContext.Provider>
    );
};