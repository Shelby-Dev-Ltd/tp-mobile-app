import { Text, View } from "react-native";
import Layout from "../layouts/Layout";
import { screenProps } from "../../types/screenprops";

export default function HomeScreen({ title, navigation, openedPage }: screenProps) {
    const content =
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>{title}</Text>
        </View>


    return (
        <Layout openedPage={openedPage} content={content} title={title} navigation={navigation} />
    );
}