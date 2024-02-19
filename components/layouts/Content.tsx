import { StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../../styles/global";

type contentProps = {}

const Content = ({ }: contentProps) => {
    return (
        <View style={globalStyles.content}>
            <Text>Content here</Text>
        </View>
    );
}

export default Content;
