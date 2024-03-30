import AsyncStorage from '@react-native-async-storage/async-storage';

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

// export const DoLogin = async () => {
//     try {
//         const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_API_URL}/auth/google`, {
//             method: 'GET'
//         })

//         const responseData = await response.json()
//     } catch (e) {

//     }
// }
