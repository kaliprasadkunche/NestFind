// src/contexts/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

export interface User {
    id: number;
    user_type: string;
    username: string;
    user_email: string;
    // Add other properties as needed
}

export interface AuthContextProps {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (userData: any) => {
        const { id, user_type, username, user_email } = userData;
        const userObject: User = {
            id,
            user_type,
            username,
            user_email,
        };
        localStorage.setItem('user', JSON.stringify(userObject)); // Store user data in local storage
        setUser(userObject);
    };

    const logout = () => {
        localStorage.removeItem('user'); // Clear user data from local storage
        setUser(null);
    };

    useEffect(() => {
        // Check if user data exists in local storage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userObject = JSON.parse(storedUser);
            setUser(userObject);
        }
    }, []); // Run only once during component initialization

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
