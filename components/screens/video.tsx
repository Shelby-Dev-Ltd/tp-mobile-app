import { View } from "react-native";
import Layout from "../layouts/Layout";
import { screenProps } from "../../types/screenprops";
import VideoMain from "../contents/video/VideoMain";

export default function VideoScreen({ title, navigation, openedPage }: screenProps) {

    const content =
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <VideoMain navigation={navigation} />
        </View>



    return (
        <Layout openedPage={openedPage} content={content} title={title} navigation={navigation} menuBar={false} />
    );
}