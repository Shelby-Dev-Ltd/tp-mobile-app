import { ImageComponent, LogBox, StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../../styles/global";

type menuBarProps = {}

const MenuBar = ({ }: menuBarProps) => {
    return (
        <View style={globalStyles.menuBarStyle} >
            <View style={globalStyles.box} />
            <View style={globalStyles.box} />
            <View style={globalStyles.bigBox} />
            <View style={globalStyles.box} />
            <View style={globalStyles.box} />
        </View>
    );
}

export default MenuBar;
