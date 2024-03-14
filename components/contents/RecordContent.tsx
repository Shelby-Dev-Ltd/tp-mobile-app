import { AutoFocus, Camera } from 'expo-camera'
import { useState } from 'react';
import { Alert } from 'react-native';
import { useIsFocused } from "@react-navigation/native";

import { Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export default function RecordContent() {
    let camera: Camera
    const isFocused = useIsFocused();
    const [startCamera, setStartCamera] = useState(false)

    const __startCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        if (status === 'granted') {
            // start the camera
            setStartCamera(true)
        } else {
            Alert.alert('Access denied')
        }
    }

    if (isFocused) {
        return (
            <View
                style={{ flex: 1, width: '100%', height: '100%' }}
            >
                <TouchableOpacity
                    onPress={() => { }}
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
            </View>
        );
    }
}