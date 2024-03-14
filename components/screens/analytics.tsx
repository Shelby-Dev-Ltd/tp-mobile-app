import { Dimensions } from "react-native";
import { Text, View } from "react-native-ui-lib";

import Layout from "../layouts/Layout";
import { screenProps } from "../../types/screenprops";
import { Colors, Image, LoaderScreen } from "react-native-ui-lib";
import { useEffect, useState } from "react";
import { BezierLineChart } from "../charts/BezierLineChart";
import { imagePlaceholders } from "../../config/placeholders";

export default function AnalyticsScreen({ title, navigation, openedPage }: screenProps) {
    const [isLoadingContent, setIsLoadingContent] = useState<boolean>(true)

    useEffect(() => {
        setTimeout(() => setIsLoadingContent(false), 3000) // dummy loading
    }, [])

    const content =
        <View style={{ flex: 1, alignItems: 'baseline', justifyContent: 'flex-start' }}>
            <View style={{ flex: 0.5 }}>
                <Image cover source={{ uri: imagePlaceholders.analytics.trafficThumbnail }} />
                <BezierLineChart />
            </View>
        </View>

    return (
        <Layout
            openedPage={openedPage}
            content={isLoadingContent ? <LoaderScreen message={`Loading ${title}`} color={Colors.grey40} /> : content}
            title={title}
            navigation={navigation}
        />
    )
}
