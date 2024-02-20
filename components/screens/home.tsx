import { Text, View } from "react-native";
import Layout from "../layouts/Layout";
import { screenProps } from "../../types/screenprops";

export default function HomeScreen({ title, navigation }: screenProps) {
    console.log(navigation)
    const content =
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>{title}</Text>
        </View>


    return (
        <Layout content={content} title={title} navigation={navigation} />
    );
}