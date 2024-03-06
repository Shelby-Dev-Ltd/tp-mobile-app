import { StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../../styles/global";

type contentProps = {
    content: React.JSX.Element
}

const Content = ({ content }: contentProps) => {
    return (
        <View style={globalStyles.content}>
            {content}
        </View>
    );
}

export default Content;
