import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ToastAndroid } from 'react-native';
import { User } from '../types/user';
import axios from 'axios';

type AuthContextType = {
    isLoggedIn: boolean;
    login: () => any;
    logout: () => void;
    user: any,
    update: (email: string, name: string, photoUrl?: string) => Promise<User | null>;
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
            const response = await axios.post(`${process.env.EXPO_PUBLIC_BASE_API_URL}/login`, {
                id: 1 // TODO: USE REAL USER ID HERE
            });

            // if (response.status !== 200 || !response.data.ok) {
            //     setIsLoggedIn(false);
            //     console.error(response);
            //     return console.error(response.data);
            // }

            const user = response.data.data.user;

            // Set user to local
            setUser(user);

            setIsLoggedIn(true);
            ToastAndroid.show('Logged in', ToastAndroid.LONG);
        } catch (e) {
            setUser(undefined);
            console.error(e);
            return ToastAndroid.show(e.message, ToastAndroid.LONG);
        }
    };

    const update = async (email: string, name: string, photoUrl: string | undefined) => {
        try {
            const response = await axios.patch(`${process.env.EXPO_PUBLIC_BASE_API_URL}/user/edit/${1}`, { // TODO: Use real user Id
                email,
                name,
                photoUrl
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const result: ApiResponse = response.data;
            if (result.error) throw (result.error);
            const updatedUser = (result.data?.user as User || { name: '', email: '', id: 0, profile: { photoUrl: '' } }) as User;
            setUser(updatedUser);
            return updatedUser;
        } catch (e) {
            console.error(e);
            return null;
        }
    };


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

