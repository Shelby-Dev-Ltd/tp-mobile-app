import { AutoFocus, Camera, CameraCapturedPicture } from 'expo-camera'
import { useEffect, useState } from 'react';
import { Alert, ToastAndroid } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
// import { useCameraDevice, Camera as VCamera } from "react-native-vision-camera"

import { Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import { getStorage, ref, uploadBytes } from "firebase/storage"
import { getApp } from "firebase/app"

import { initializeApp } from 'firebase/app';
import RecordConfirmation from './RecordConfirmation';

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

initializeApp(firebaseConfig);

export default function RecordMain() {
    let camera: Camera
    const isFocused = useIsFocused();
    // const device = useCameraDevice('back');
    const [startCamera, setStartCamera] = useState<boolean>(false)
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [googleResponse, setGoogleResponse] = useState()
    const [capturedImagePath, setCapturedImagePath] = useState<string>("")

    const __startCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        if (status === 'granted') {
            // start the camera
            setStartCamera(true)
        } else {
            Alert.alert('Access denied')
        }
    }

    useEffect(() => {
        if (startCamera) return
        __startCamera()
    }, [startCamera])

    const CaptureImage = async () => {
        try {
            const image: CameraCapturedPicture = await camera.takePictureAsync()
            const imageUri: string = image.uri
            ToastAndroid.show(imageUri, ToastAndroid.SHORT)
            console.log(imageUri)
            setCapturedImagePath(imageUri)


            // UploadToCloudStore(imageUri)
            // setCapturedImage(imageUri)
        } catch (e) {
            console.error(e)
        } finally {
            // SubmitToGoogle()
        }

    }

    const UploadToCloudStore = async (imageUri: string) => {
        try {
            const app = getApp()
            const storage = getStorage(app)
            const storageRef = ref(storage, 'captures')

            if (!storage) throw Error("No storage found!")

            const response = await fetch(imageUri);
            const blob = await response.blob();
            const imageName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
            const imageRef = ref(storage, imageUri)

            const res = await DoUploadToStorage(storageRef, imageRef)
            console.log(res)


        } catch (error) {
            console.error(error);
        }
    };

    const DoUploadToStorage = async (storageRef: any, file: any) => {
        try {
            const res = await uploadBytes(storageRef, file)
            return res
        } catch (e) {
            return e
        }
    }

    const SubmitToGoogle = async () => {
        try {
            setIsUploading(true);
            let body = JSON.stringify({
                requests: [
                    {
                        features: [
                            { type: "LABEL_DETECTION", maxResults: 5 },
                        ],
                        image: {
                            source: {
                                imageUri: "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
                            }
                        }
                    }
                ]
            });
            let response = await fetch(
                "https://vision.googleapis.com/v1/images:annotate?key=" +
                process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: body
                }
            );
            let responseJson = await response.json();
            responseJson.responses[0].labelAnnotations.map((i: any) => console.log(i.description))

            setGoogleResponse(responseJson)
            setIsUploading(false)
        } catch (error) {
            console.error(error);
        }
    };

    if (isFocused) {
        if (capturedImagePath.length) {
            return (
                <RecordConfirmation imageUrlLocal={capturedImagePath} cancelImage={() => setCapturedImagePath("")} />
            )
        }
        return (
            <View
                style={{ flex: 1, width: '100%', height: '100%' }}
            >
                <TouchableOpacity
                    onPress={() => CaptureImage()}
                    style={{
                        width: 70,
                        borderRadius: 50,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 70,
                        backgroundColor: '#2F80ED',
                        position: 'absolute',
                        zIndex: 1,
                        bottom: 100,
                        left: '50%',
                        marginLeft: -35,
                    }}
                >
                    <View
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 50,
                            backgroundColor: 'white',
                        }}
                    />
                </TouchableOpacity>
                <Camera
                    style={{ flex: 1, width: "auto", height: "auto" }}
                    ratio='16:9'
                    ref={(r) => {
                        camera = r as Camera
                    }}
                />
                {/* <VCamera
                    style={{ flex: 1, width: "auto", height: "auto" }}
                    device={device}
                    isActive={true}
                /> */}
            </View>
        )
    }
}