import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ToastAndroid } from 'react-native';
import { User } from '../types/user';

type AuthContextType = {
    isLoggedIn: boolean;
    login: () => any;
    logout: () => void;
    user: any,
    update: (email: string, name: string) => Promise<User | null>;
};

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    login: () => { },
    logout: () => { },
    user: undefined,
    update: async () => null,
});

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User>();

    const login = async () => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_API_URL}/login`, {
                method: 'POST',
                body: JSON.stringify({
                    id: 1 // TODO: USE REAL USER ID HERE
                }),
                headers: {
                    "Content-Type": 'application/json',
                }
            })
            console.log(response);

            if (response.status !== 200 || !response.ok) throw Error(response.statusText);

            const user: ApiResponse = await response.json();

            if (!user) throw Error('No user found');

            // Set user to local
            setUser(user.data.user);

            setIsLoggedIn(true);
            ToastAndroid.show('Logged in..', ToastAndroid.LONG);
        } catch (e) {
            setUser(undefined);
            console.error(e);
            return ToastAndroid.show(e, ToastAndroid.LONG);
        }

    };

    const update = async (email: string, name: string) => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_API_URL}/user/edit/${1}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    email,
                    name,
                }),
                headers: {
                    'Content-type': 'application/json',
                }
            }) // TODO: Use real user Id
            console.log(response);

            const result: ApiResponse = await response.json();
            if (result.error) throw (result.error);

            const updatedUser = (result.data?.user || { name: '', email: '', id: 0 }) as User;

            setUser(updatedUser);
            return updatedUser;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    const logout = () => {
        setUser(undefined);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, user, update }}>
            {children}
        </AuthContext.Provider>
    );
};

