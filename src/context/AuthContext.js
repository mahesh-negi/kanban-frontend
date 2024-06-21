import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get(`${process.env.REACT_APP_API_URL}/auth/me`)
                .then(response => setUser(response.data))
                .catch(() => localStorage.removeItem('token'));
        }
    }, []);

    const login = async (email, password) => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password });
        const { token } = response.data;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const userResponse = await axios.get(`${process.env.REACT_APP_API_URL}/auth/me`);
        setUser(userResponse.data);
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
