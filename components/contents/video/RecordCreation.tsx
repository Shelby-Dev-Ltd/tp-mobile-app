import React, { useState } from "react";
import { Dimensions, Pressable, SafeAreaView, Text, TextInput, View } from "react-native";

type RecordCreationProps = {
    // mediaId: number,
    // user: Object,
    onSubmit: (location: string) => any,
}

const windowWidth = Dimensions.get('window').width;

const RecordCreation: React.FC<RecordCreationProps> = ({ onSubmit }) => {
    const [inputLocation, setInputLocation] = useState("");
    return (
        <View style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
            <Text
                style={{
                    color: 'black',
                    fontWeight: '400',
                    fontSize: 16,
                }}
            >
                Location
            </Text>
            <SafeAreaView
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                }}
            >

                <TextInput
                    style={{
                        width: windowWidth / 2,
                        height: 40,
                        borderColor: 'lightgrey',
                        borderWidth: 1,
                        borderTopLeftRadius: 4,
                        borderBottomLeftRadius: 4,
                        padding: 10,
                    }}
                    onChangeText={setInputLocation}
                    value={inputLocation}
                />
                <Pressable
                    onPress={() => onSubmit(inputLocation)}
                    style={{
                        width: windowWidth / 3,
                        height: 40,
                        backgroundColor: '#2F80ED',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                    }}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontWeight: '700',
                        }}
                    >
                        Submit
                    </Text>
                </Pressable>
            </SafeAreaView>
        </View>
    );
}

export default RecordCreation;