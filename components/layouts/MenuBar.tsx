import { Button, ImageComponent, LogBox, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../styles/global";
import React, { useEffect } from "react";
import { MenuItem } from "./MenuItem";

type menuBarProps = {
    navigation: any,
    openedPage: string,
}

const MenuBar = ({ navigation, openedPage }: menuBarProps) => {

    const doNavigate = (destination: string) => {
        navigation.navigate(destination)
    }

    return (
        <View style={globalStyles.menuBarStyle} >
            <View style={globalStyles.box}>
                <MenuItem isOpen={openedPage === "home"} doNavigate={doNavigate} page={{ title: "home", ioniconstring: "home", destination: "home" }} />
            </View>
            <View style={globalStyles.box}>
                <MenuItem isOpen={openedPage === "history"} doNavigate={doNavigate} page={{ title: "history", ioniconstring: "book", destination: "history" }} />
            </View>

            <View style={globalStyles.bigBox}>
                <MenuItem isOpen={openedPage === "record"} doNavigate={doNavigate} page={{ title: "record", ioniconstring: "camera", destination: "record" }} />
            </View>
            <View style={globalStyles.box}>
                <MenuItem isOpen={openedPage === "analytics"} doNavigate={doNavigate} page={{ title: "analytics", ioniconstring: "pie-chart", destination: "analytics" }} />
            </View>
            <View style={globalStyles.box}>
                <MenuItem isOpen={openedPage === "settings"} doNavigate={doNavigate} page={{ title: "settings", ioniconstring: "settings", destination: "settings" }} />
            </View>
        </View>
    );
}

export default MenuBar;
