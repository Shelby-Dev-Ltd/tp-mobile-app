import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { globalStyles } from "../../styles/global";
import MenuBar from "./MenuBar";
import Content from "./Content";
import React, { useEffect } from "react";
import { NavigationAction } from "@react-navigation/native";
import { useAuth } from "../../contexts/AuthContext";

type layoutProps = {
    content: React.JSX.Element,
    title: string,
    navigation: any,
    openedPage: string,
    menuBar: boolean,
}

const Layout = ({ content, title, navigation, openedPage, menuBar = true }: layoutProps) => {
    const { login, isLoggedIn } = useAuth()

    useEffect(() => {
        if (openedPage == 'signup') return
        if (!isLoggedIn) {
            ToastAndroid.show('You are not logged in!', ToastAndroid.SHORT)
            return navigation.navigate('signup')
        }
    }, [isLoggedIn])
    return (
        <View style={globalStyles.container}>
            <Content content={content} noPadding={openedPage == "video"} />
            {menuBar ? <MenuBar openedPage={openedPage} navigation={navigation} /> : null}

        </View>
    );
}

export default Layout;