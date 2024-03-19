import { Button, Text, View } from "react-native";
import Layout from "../layouts/Layout";
import { screenProps } from "../../types/screenprops";

export default function HistoryScreen({ title, navigation, openedPage }: screenProps) {

    const content =
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>{title}</Text>
        </View>


    return (
        <Layout openedPage={openedPage} content={content} title={title} navigation={navigation} menuBar={false} />
    );
}