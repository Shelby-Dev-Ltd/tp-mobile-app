import { initializeApp } from 'firebase/app';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA_FUasTG2j3E693gcmDFJ4ihuoaVHYIJ8",
    authDomain: "traffic-pulse-app.firebaseapp.com",
    projectId: "traffic-pulse-app",
    storageBucket: "traffic-pulse-app.appspot.com",
    messagingSenderId: "518077601368",
    appId: "1:518077601368:web:888724f481c6022f095c2d"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);