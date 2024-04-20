import { View, Image, Pressable, Text, Button, Dimensions } from "react-native";
import { Video, ResizeMode } from 'expo-av';
import { useEffect, useRef, useState } from "react";
import { LoaderScreen } from "react-native-ui-lib";

type videoConfirmationProps = {
    videoUrlLocal?: string,
    cancelVideo: () => void,
    submitVideo: () => void,
    isUploadingVideo: boolean,
}

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const VideoConfirmation = ({ videoUrlLocal, cancelVideo, submitVideo, isUploadingVideo }: videoConfirmationProps) => {
    const video = useRef(null);
    const [status, setStatus] = useState({});

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
            <View style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 100,
                        right: 10,
                        zIndex: 1,
                    }}
                >
                    <Pressable
                        onPress={() => submitVideo()}
                        style={{
                            borderRadius: 30,
                            backgroundColor: '#2F80ED',
                            paddingHorizontal: 20,
                            paddingVertical: 5,
                            minWidth: 120,
                            minHeight: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontWeight: '700',
                            }}
                        >
                            Proceed
                        </Text>
                    </Pressable>
                </View>

                <View
                    style={{
                        flex: 1,
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Video
                        ref={video}
                        source={{ uri: videoUrlLocal }}
                        style={{ flex: 1, width: '100%', height: '100%' }}
                        useNativeControls
                        resizeMode={ResizeMode.CONTAIN}
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                    />
                </View>

            </View>
        </>
    );
}

export default VideoConfirmation;