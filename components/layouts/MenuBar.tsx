import { Button, ImageComponent, LogBox, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../styles/global";
import React from "react";
import { MenuItem } from "./MenuItem";

type menuBarProps = {
    navigation: any
}

const MenuBar = ({ navigation }: menuBarProps) => {

    const doNavigate = (destination: string) => {
        navigation.navigate(destination)
    }

    return (
        <View style={globalStyles.menuBarStyle} >
            <View style={globalStyles.box}>
                <MenuItem doNavigate={doNavigate} page={{ title: "home", ioniconstring: "home", destination: "home" }} />
            </View>
            <View style={globalStyles.box}>
                <MenuItem doNavigate={doNavigate} page={{ title: "history", ioniconstring: "book", destination: "history" }} />
            </View>

            <View style={globalStyles.bigBox}>
                <MenuItem doNavigate={doNavigate} page={{ title: "record", ioniconstring: "camera", destination: "record" }} />
            </View>
            <View style={globalStyles.box}>
                <MenuItem doNavigate={doNavigate} page={{ title: "chart", ioniconstring: "pie-chart", destination: "chart" }} />
            </View>
            <View style={globalStyles.box}>
                <MenuItem doNavigate={doNavigate} page={{ title: "settings", ioniconstring: "settings", destination: "settings" }} />
            </View>
        </View>
    );
}

export default MenuBar;
