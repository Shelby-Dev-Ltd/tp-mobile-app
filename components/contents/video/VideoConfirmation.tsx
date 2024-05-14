import { View, Image, Pressable, Text, Button, Dimensions, TouchableOpacity } from "react-native";
import { Video, ResizeMode } from 'expo-av';
import { useEffect, useRef, useState } from "react";

type videoConfirmationProps = {
    videoUrlLocal?: string,
    cancelVideo: () => void,
    submitVideo: () => void,
}

const VideoConfirmation = ({ videoUrlLocal, cancelVideo, submitVideo }: videoConfirmationProps) => {
    const video = useRef<Video>();
    const [status, setStatus] = useState({});

    return (
        <>
            <View style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
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
                        style={{ width: '100%', height: '90%' }}
                        useNativeControls
                        resizeMode={ResizeMode.COVER}
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                    />
                    <View
                        style={{
                            backgroundColor: 'black',
                            width: '100%',
                            bottom: 0,
                            height: '10%',
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => submitVideo()}
                            style={{
                                backgroundColor: '#2F80ED',
                                paddingHorizontal: 20,
                                paddingVertical: 5,
                                width: '100%',
                                height: '100%',
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
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </>
    );
}

export default VideoConfirmation;