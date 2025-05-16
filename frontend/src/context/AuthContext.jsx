import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem("auth") === "true"
    );

    const login = async (username, password) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                username,
                password,
            });
            if (res.data.success) {
                localStorage.setItem("auth", "true");
                setIsAuthenticated(true);
                return true;
            }
        } catch (err) {
            console.error("Login error", err);
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem("auth");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
