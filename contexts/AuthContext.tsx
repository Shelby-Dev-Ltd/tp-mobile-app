import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ToastAndroid } from 'react-native';
import { User } from '../types/user';
import axios from 'axios';
import { DoLogin } from '../services/authService';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

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
    const [user, setUser] = useState<User | undefined>();

    const login = async () => {
        if (user) {
            return setIsLoggedIn(true);
        }

        try {
            const signin = await DoLogin();

            if (signin === 'CANCELLED') return ToastAndroid.show('Cancelled', ToastAndroid.SHORT);

            const response = await axios.post(`${process.env.EXPO_PUBLIC_BASE_API_URL}/login`, {
                oauthId: signin.user.id,
                email: signin.user.email,
                name: signin.user.givenName + (signin.user.familyName || ''),
                photoUrl: signin.user.photo,
            });

            const user = response.data.data.user;

            if (!user) throw Error('Failed to login');

            console.log({ ...user, idToken: signin.idToken });

            // Set user to local
            setUser({ ...user, idToken: signin.idToken });

            setIsLoggedIn(true);

            return 'LOGGED';

        } catch (e) {
            setUser(undefined);
            console.error("ERROR LOGGING IN");
            console.error(e);
            ToastAndroid.show(e.message, ToastAndroid.LONG);
        }
    };

    const update = async (email: string, name: string, photoUrl: string | undefined) => {
        try {
            const response = await axios.patch(`${process.env.EXPO_PUBLIC_BASE_API_URL}/user/edit/${user.id}`, {
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


    const logout = async () => {
        setUser(undefined);
        setIsLoggedIn(false);
        await GoogleSignin.signOut();
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, user, update }}>
            {children}
        </AuthContext.Provider>
    );
};

