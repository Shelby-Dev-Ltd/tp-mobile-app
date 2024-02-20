import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { globalStyles } from "../../styles/global";
import Header from "./Header";
import MenuBar from "./MenuBar";
import Content from "./Content";
import React from "react";
import { NavigationAction } from "@react-navigation/native";

type layoutProps = {
    content: React.JSX.Element,
    title: string,
    navigation: any,
}

const Layout = ({ content, title, navigation }: layoutProps) => {
    return (
        <View style={globalStyles.container}>
            {/* <Header title={title} /> */}
            <Content content={content} />
            <MenuBar navigation={navigation} />
        </View>
    );
}

export default Layout;