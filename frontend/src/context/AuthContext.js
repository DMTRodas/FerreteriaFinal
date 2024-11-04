import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:8080/api/usuarios/login', { username, password });
            const role = response.data.role;
            const user = { username, role };
            setUser(user);
            navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert('Credenciales incorrectas');
            } else {
                console.error("Error al autenticar:", error);
                alert('Error en el sistema. Intente más tarde.');
            }
        }
    };

    const logout = () => {
        setUser(null); 
        navigate('/login'); 
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);


