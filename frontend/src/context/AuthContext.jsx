// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const users = [
    { username: "admin", password: "admin123" },
    { username: "ratsetse", password: "rat123" },
    { username: "guest", password: "guest123" }
];

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem("auth") === "true";
    });

    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem("user")) || null;
    });

    const login = (username, password) => {
        const foundUser = users.find(
            (u) => u.username === username && u.password === password
        );

        if (foundUser) {
            setIsAuthenticated(true);
            setUser(foundUser);
            localStorage.setItem("auth", "true");
            localStorage.setItem("user", JSON.stringify(foundUser));
            return true;
        }

        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("auth");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
