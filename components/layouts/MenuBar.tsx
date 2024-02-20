import { Button, ImageComponent, LogBox, StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../../styles/global";

type menuBarProps = {
    navigation: any
}

const MenuBar = ({ navigation }: menuBarProps) => {
    return (
        <View style={globalStyles.menuBarStyle} >
            <View style={globalStyles.box}>
                <Button
                    title="His"
                    onPress={() => navigation.navigate('History')}
                />
            </View>
            <View style={globalStyles.box} />
            <View style={globalStyles.bigBox}>
                <Button
                    title="Home"
                    onPress={() => navigation.navigate('Home')}
                />
            </View>
            <View style={globalStyles.box} />
            <View style={globalStyles.box} />
        </View>
    );
}

export default MenuBar;
