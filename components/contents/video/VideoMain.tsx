import { AutoFocus, Camera, CameraCapturedPicture } from 'expo-camera'
import { useEffect, useState } from 'react';
import { Alert, Dimensions, Platform, ToastAndroid } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
// import { useCameraDevice, Camera as VCamera } from "react-native-vision-camera"

import { Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import { UploadResult, getStorage, ref, uploadBytes } from "firebase/storage"
import { getApp } from "firebase/app"

import { initializeApp } from 'firebase/app';
import RecordConfirmation from './VideoConfirmation';
import { LoaderScreen, Toast } from 'react-native-ui-lib';
import RecordCreation from './RecordCreation';

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

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

export default function VideoMain({ navigation }) {
    let camera: Camera
    const isFocused = useIsFocused();
    // const device = useCameraDevice('back');
    const [startCamera, setStartCamera] = useState<boolean>(false);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [isUploadingVideo, setIsUploadingVideo] = useState<boolean>(false);
    const [capturedVideoPath, setCapturedVideoPath] = useState<string>("");
    const [currentMediaId, setCurrentMediaId] = useState<number>(-1);

    const __startCamera = async () => {
        const { status: cameraPerm } = await Camera.requestCameraPermissionsAsync();
        const { status: audioPerm } = await Camera.requestMicrophonePermissionsAsync();
        if (cameraPerm === 'granted' && audioPerm === 'granted') {
            // start the camera
            setStartCamera(true);
        } else {
            Alert.alert('Please allow all permissions');
        }
    };

    useEffect(() => {
        if (startCamera) return
        __startCamera()
    }, [startCamera]);

    useEffect(() => {
        const startRecording = async () => {
            if (isRecording) {
                const video = await camera.recordAsync();
                const videoPath = video.uri;
                setCapturedVideoPath(videoPath);
            }
        };
        startRecording();
    }, [isRecording])

    const StartRecording = () => {
        setIsRecording(true);
    };

    const StopRecording = () => {
        camera.stopRecording();
        setIsRecording(false);
    };

    const UploadToCloudStore = async (videoUri: string) => {
        try {
            const response: any = await fetch(videoUri);
            const blob = await response.blob();
            const videoName = videoUri.substring(videoUri.lastIndexOf('/') + 1);

            const app = getApp()
            const storage = getStorage(app)
            const storageRef = ref(storage, `captures/${videoName}`)

            if (!storage) throw Error("No storage found!")



            const res = await DoUploadToStorage(storageRef, blob);
            return res;
        } catch (error) {
            console.error(error);
        }
    };

    const DoUploadToStorage = async (storageRef: any, file: any): Promise<UploadResult> => {
        try {
            const res: UploadResult = await uploadBytes(storageRef, file);
            return res;
        } catch (e) {
            return e
        }
    }

    const saveVideo = async (publicUrl: string) => {
        try {
            const res = await fetch(`${process.env.EXPO_PUBLIC_BASE_API_URL}/upload-video`, {
                method: 'POST',
                body: JSON.stringify({
                    url: publicUrl,
                }),
                headers: {
                    'content-type': 'application/json',
                }
            })

            if (res.status.toString().slice(0, 1) !== '2') { // fails 
                throw Error(res.status.toString());
            }

            const data: VideoResponse = await res.json();

            if (data.error) throw Error(data.status.toString());

            return data.data.media;

        } catch (e) {
            console.error(e);
        }
    }

    const submitVideo = async () => {
        setIsUploadingVideo(true); //setIsLoading
        try {
            // const uri = Platform.OS === 'android' ? capturedVideoPath : capturedVideoPath.replace('file://', '');
            const res = await UploadToCloudStore(capturedVideoPath);

            const fullPath = res.ref.fullPath;
            const publicUrlLink = 'https://firebasestorage.googleapis.com/v0/b/traffic-pulse-app.appspot.com/o/captures';
            const publicUrl = `${publicUrlLink}%2F${fullPath.slice(fullPath.indexOf('/') + 1)}?alt=media`;

            const { id: mediaId } = await saveVideo(publicUrl);

            setCurrentMediaId(mediaId);
        } catch (e) {
            console.error(e);
            ToastAndroid.show(e, ToastAndroid.LONG);
        } finally {
            setIsUploadingVideo(false);
        }
    }

    const onSubmit = async (location: string) => {
        try {
            setIsUploadingVideo(true);

            const res = await fetch(`${process.env.EXPO_PUBLIC_BASE_API_URL}/records`, {
                method: 'POST',
                body: JSON.stringify({
                    user: { id: 1 }, // TODO PUT REAL USER HERE
                    location,
                    mediaId: currentMediaId,
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data: ApiResponse = await res.json();

            if (data.error) throw Error(data.status.toString());

            navigation.navigate('/records');
        } catch (e) {

        } finally {
            setIsUploadingVideo(false);
        }
    };

    if (isFocused) {
        if (capturedVideoPath.length && currentMediaId < 0) {
            return (
                <RecordConfirmation
                    videoUrlLocal={capturedVideoPath}
                    cancelVideo={() => setCapturedVideoPath("")}
                    submitVideo={submitVideo}
                />
            )
        }

        if (capturedVideoPath.length && currentMediaId > -1) {
            return (
                <RecordCreation
                    onSubmit={onSubmit}
                />
            )
        }
        return (
            <>
                {
                    isUploadingVideo ?
                        (
                            <View
                                style={{
                                    width: screenWidth,
                                    height: screenHeight,
                                    backgroundColor: 'white',
                                    opacity: 0.5,
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    zIndex: 10,
                                }}
                            >
                                <LoaderScreen />
                            </View>
                        ) :
                        null
                }
                <View
                    style={{ flex: 1, width: '100%', height: '100%' }}
                >
                    <TouchableOpacity
                        onPress={!isRecording ? () => StartRecording() : () => StopRecording()}
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
                                width: isRecording ? 0 : 50,
                                height: isRecording ? 0 : 50,
                                borderRadius: 50,
                                backgroundColor: isRecording ? '' : 'white',
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
                </View>
            </>
        )
    }
}