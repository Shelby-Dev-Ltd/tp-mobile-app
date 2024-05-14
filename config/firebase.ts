import { FirebaseOptions, initializeApp } from 'firebase/app';
import serviceJson from './serviceAccount';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: serviceJson.client[0].api_key,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: serviceJson.project_info.project_id,
    storageBucket: serviceJson.project_info.storage_bucket,
    messagingSenderId: serviceJson.project_info.project_number,
    appId: serviceJson.client[0].client_info.mobilesdk_app_id,
};

GoogleSignin.configure({
    webClientId: serviceJson.client[0].oauth_client[0].client_id, // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
});

// Initialize Firebase

export const app = initializeApp(firebaseConfig as unknown as FirebaseOptions);