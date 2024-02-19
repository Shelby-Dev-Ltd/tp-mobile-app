import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { globalStyles } from "../../styles/global";
import Header from "./Header";
import MenuBar from "./MenuBar";
import Content from "./Content";

const Layout = () => {
    return (
        <View style={globalStyles.container}>
            <Header title="Main Menu" />
            <Content />
            <MenuBar />
        </View>
    );
}

export default Layout;