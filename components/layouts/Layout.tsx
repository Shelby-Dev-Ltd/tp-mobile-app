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
    menuBar: boolean,
}

const Layout = ({ content, title, navigation, openedPage, menuBar = true }: layoutProps) => {
    return (
        <View style={globalStyles.container}>
            <Content content={content} />
            {menuBar ? <MenuBar openedPage={openedPage} navigation={navigation} /> : null}

        </View>
    );
}

export default Layout;