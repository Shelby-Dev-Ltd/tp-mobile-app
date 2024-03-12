import { Text, View } from "react-native";
import Layout from "../layouts/Layout";
import { screenProps } from "../../types/screenprops";
import { useEffect, useState } from "react";

export default function RecordScreen({ title, navigation, openedPage }: screenProps) {
    const [isLoadingContent, setIsLoadingContent] = useState<boolean>(true)

    useEffect(() => {
        setTimeout(() => setIsLoadingContent(false), 3000) // dummy loading
    }, [])

    const content =
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>{title}</Text>
        </View>


    return (
        <Layout openedPage={openedPage} content={content} title={title} navigation={navigation} />
    );
}