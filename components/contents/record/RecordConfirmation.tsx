import { View, Image, Pressable, Text } from "react-native";

type recordConfirmationProps = {
    videoUrlLocal?: string,
    imageUrlLocal?: string,
    cancelImage: () => void,
}

const RecordConfirmation = ({ imageUrlLocal, cancelImage }: recordConfirmationProps) => {

    return (
        <View style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Pressable
                onPress={() => cancelImage()}
            >
                <Text>
                    Clear
                </Text>
            </Pressable>
            <Image
                source={{ uri: imageUrlLocal }}
                style={{ width: 200, height: 200 }}
            />
        </View>
    );
}

export default RecordConfirmation;