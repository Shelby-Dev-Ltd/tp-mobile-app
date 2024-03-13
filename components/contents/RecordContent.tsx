import { Camera } from 'expo-camera'
import { useState } from 'react';
import { Alert } from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';

export default function RecordContent(){
    let camera: Camera
    const [startCamera, setStartCamera] = useState(false)

    const __startCamera = async () => {
        const { status } = await Camera.requestPermissionsAsync()
        if (status === 'granted') {
            // start the camera
            setStartCamera(true)
        } else {
            Alert.alert('Access denied')
        }
    }

    return (
        <>
            {startCamera ? (
            <View
                style={{flex: 1, width: '100%', height: '100%'}}
            >
                <Camera
                    style={{ flex: 1, width: "100%", height: "100%" }}
                    ref={(r) => {
                        camera = r as Camera
                    }}
                />
            </View>

            ) : (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <TouchableOpacity
                    onPress={__startCamera}
                    style={{
                        width: 130,
                        borderRadius: 4,
                        backgroundColor: '#14274e',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 40
                    }}
                >
                    <Text
                        style={{
                            color: '#fff',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}
                    >
                        Take picture
                    </Text>
                </TouchableOpacity>
            </View>
            )}
        </>
    )
}