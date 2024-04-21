import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { DoLogin } from '../services/authService';
import { ToastAndroid } from 'react-native';

type AuthContextType = {
    isLoggedIn: boolean;
    login: () => any;
    logout: () => void;
    user: any,
};

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    login: () => { },
    logout: () => { },
    user: undefined,
});

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState();

    const login = async () => {
        try {
            // const user = await DoLogin();

            // if (user.hasOwnProperty('error')) {
            //     return console.error(user);
            // }
            // console.log(user);
            // setUser(user);
            setIsLoggedIn(true);
        } catch (e) {
            setUser(undefined);
            return ToastAndroid.show(e, ToastAndroid.LONG);
        }

    };

    const logout = () => {
        setUser(undefined);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};

