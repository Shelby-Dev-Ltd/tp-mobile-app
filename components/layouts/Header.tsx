import { StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../../styles/global";

type headerProps = {
    title: string
}

const Header = ({ title }: headerProps) => {
    return (
        <View style={globalStyles.header}>
            <Text style={globalStyles.headerTitle}>{title}</Text>
        </View>
    );
}

export default Header;
