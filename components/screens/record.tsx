import { Text, View } from "react-native";
import Layout from "../layouts/Layout";
import { screenProps } from "../../types/screenprops";
import { useEffect, useState } from "react";
import { LoaderScreen } from "react-native-ui-lib";
import RecordMain from "../contents/record/RecordMain";

export default function RecordScreen({ title, navigation, openedPage }: screenProps) {

    const content =
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <RecordMain />
        </View>



    return (
        <Layout openedPage={openedPage} content={content} title={title} navigation={navigation} menuBar={false} />
    );
}