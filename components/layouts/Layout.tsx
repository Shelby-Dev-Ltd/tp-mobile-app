import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { globalStyles } from "../../styles/global";
import MenuBar from "./MenuBar";
import Content from "./Content";
import React from "react";
import { NavigationAction } from "@react-navigation/native";

type layoutProps = {
    content: React.JSX.Element,
    title: string,
    navigation: any,
    openedPage: string,
}

const Layout = ({ content, title, navigation, openedPage }: layoutProps) => {
    return (
        <View style={globalStyles.container}>
            <Content content={content} />
            <MenuBar openedPage={openedPage} navigation={navigation} />
        </View>
    );
}

export default Layout;