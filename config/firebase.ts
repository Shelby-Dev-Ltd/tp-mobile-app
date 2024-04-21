import { FirebaseOptions, initializeApp } from 'firebase/app';
import * as serviceJson from '../.serviceAccount.json';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: serviceJson.client[0].api_key,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: serviceJson.project_info.project_id,
    storageBucket: serviceJson.project_info.storage_bucket,
    messagingSenderId: serviceJson.project_info.project_number,
    appId: serviceJson.client[0].client_info.mobilesdk_app_id,
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig as unknown as FirebaseOptions);