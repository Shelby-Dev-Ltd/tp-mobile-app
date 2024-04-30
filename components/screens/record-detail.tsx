import React, { useEffect } from "react";
import Layout from "../layouts/Layout";
import { screenProps } from "../../types/screenprops";
import Analytics from "../contents/analytics/Analytics";
import { Text } from "react-native";
import { RecordDetail } from "../contents/record/RecordDetail";

export default function RecordDetailScreen({ route, title, navigation, openedPage }) {
    const { id } = route.params;

    const content = (
        <RecordDetail
            navigation={navigation}
            id={id}
        />
    );

    return (
        <Layout
            openedPage={openedPage}
            content={content}
            title={title}
            navigation={navigation}
            menuBar={true}
        />
    );
}
