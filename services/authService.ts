import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import { User } from '../types/user';
import {
    statusCodes,
    GoogleSignin
} from '@react-native-google-signin/google-signin';

export const saveTokens = async (accessToken: string, refreshToken: string) => {
    try {
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
    } catch (e) {
        console.error('Error saving tokens:', e);
    }
};

export const getTokens = async () => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        return { accessToken, refreshToken };
    } catch (e) {
        console.error('Error retrieving tokens:', e);
        return { accessToken: null, refreshToken: null };
    }
};

export const removeTokens = async () => {
    try {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
    } catch (e) {
        console.error('Error removing tokens:', e);
    }
};

export const DoLogin = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        return userInfo;
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.error(error)
        } else if (error.code === statusCodes.IN_PROGRESS) {
            console.error(error)
            // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.error(error)
            // play services not available or outdated
        } else {
            console.error(error)
            // some other error happened
        }
    }
};