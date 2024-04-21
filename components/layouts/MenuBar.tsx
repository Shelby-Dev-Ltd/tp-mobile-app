import { Button, ImageComponent, LogBox, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../styles/global";
import React, { useEffect } from "react";
import { MenuItem } from "./MenuItem";
import { DestinationType, NavigationType } from "../../types/navigation";

type menuBarProps = {
    navigation: NavigationType,
    openedPage: string,
}

const MenuBar = ({ navigation, openedPage }: menuBarProps) => {

    const doNavigate = (destination: DestinationType) => {
        navigation.navigate(destination)
    }

    return (
        <View style={globalStyles.menuBarStyle} >
            <View style={globalStyles.box}>
                <MenuItem isOpen={openedPage === "home"} doNavigate={doNavigate} page={{ title: "home", ioniconstring: "home", destination: "home" }} />
            </View>
            <View style={globalStyles.box}>
                <MenuItem isOpen={openedPage === "records"} doNavigate={doNavigate} page={{ title: "records", ioniconstring: "book", destination: "records" }} />
            </View>

            <View style={globalStyles.box}>
                <MenuItem isOpen={openedPage === "video"} doNavigate={doNavigate} page={{ title: "video", ioniconstring: "camera", destination: "video" }} />
            </View>
            <View style={globalStyles.box}>
                <MenuItem isOpen={openedPage === "analytics"} doNavigate={doNavigate} page={{ title: "analytics", ioniconstring: "pie-chart", destination: "analytics" }} />
            </View>
            <View style={globalStyles.box}>
                <MenuItem isOpen={openedPage === "profile"} doNavigate={doNavigate} page={{ title: "profile", ioniconstring: "person", destination: "profile" }} />
            </View>
        </View>
    );
}

export default MenuBar;
