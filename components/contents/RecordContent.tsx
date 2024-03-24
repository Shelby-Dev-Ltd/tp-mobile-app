import { AutoFocus, Camera, CameraCapturedPicture } from 'expo-camera'
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
// import { useCameraDevice, Camera as VCamera } from "react-native-vision-camera"

import { Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export default function RecordContent() {
    let camera: Camera
    const isFocused = useIsFocused();
    // const device = useCameraDevice('back');
    const [startCamera, setStartCamera] = useState<boolean>(false)
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [googleResponse, setGoogleResponse] = useState()
    const [capturedImage, setCapturedImage] = useState<string>()

    const __startCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        if (status === 'granted') {
            // start the camera
            setStartCamera(true)
        } else {
            Alert.alert('Access denied')
        }
    }

    const CaptureImage = async () => {
        try {
            const image: CameraCapturedPicture = await camera.takePictureAsync()
            const imageUri: string = image.uri

            setCapturedImage(imageUri)
        } catch (e) {
            console.error(e)
        } finally {
            SubmitToGoogle()
        }

    }

    const SubmitToGoogle = async () => {
        try {
            setIsUploading(true);
            let body = JSON.stringify({
                requests: [
                    {
                        features: [
                            { type: "LABEL_DETECTION", maxResults: 10 },
                            { type: "LANDMARK_DETECTION", maxResults: 5 },
                            { type: "FACE_DETECTION", maxResults: 5 },
                            { type: "LOGO_DETECTION", maxResults: 5 },
                            { type: "TEXT_DETECTION", maxResults: 5 },
                            { type: "DOCUMENT_TEXT_DETECTION", maxResults: 5 },
                            { type: "SAFE_SEARCH_DETECTION", maxResults: 5 },
                            { type: "IMAGE_PROPERTIES", maxResults: 5 },
                            { type: "CROP_HINTS", maxResults: 5 },
                            { type: "WEB_DETECTION", maxResults: 5 }
                        ],
                        image: {
                            source: {
                                imageUri: capturedImage
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
            console.log(responseJson)

            setGoogleResponse(responseJson)
            setIsUploading(false)
        } catch (error) {
            console.error(error);
        }
    };

    //Logs
    useEffect(() => {
        console.log(`UPLOADING: ${isUploading}`)
        console.log(`RES: ${googleResponse}`)
    }, [isUploading, googleResponse])

    if (isFocused) {

        // if (device == null) return <Text>No Camera Device found!</Text>

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
                        bottom: 20,
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
        );
    }
}