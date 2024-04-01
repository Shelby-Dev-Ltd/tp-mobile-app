import { StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../../styles/global";

type contentProps = {
    content: React.JSX.Element,
    noPadding?: boolean,
}

const Content = ({ content, noPadding }: contentProps) => {
    return (
        <View style={!noPadding ? globalStyles.content : { flex: 1 }}>
            {content}
        </View>
    );
}

export default Content;
