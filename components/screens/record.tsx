import { RefreshControl, ScrollView, Text, View } from "react-native";
import Layout from "../layouts/Layout";
import { screenProps } from "../../types/screenprops";
import Record from "../contents/record/Record";
import { useRecords } from "../../data/records";
import { Record as RecordType } from "../../types/record";
import { useEffect } from "react";

export default function RecordScreen({ title, navigation, openedPage }: screenProps) {

    const { isLoading, mutate, data: records } = useRecords();

    const onRefresh = () => {
        mutate();
    }

    const content =
        (<View style={{ flex: 1 }}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={onRefresh}
                    />
                }
            >
                <Record
                    records={records || []}
                    navigation={navigation}
                />
            </ScrollView>
        </View>)

    return (
        <Layout openedPage={openedPage} content={content} title={title} navigation={navigation} menuBar={true} />
    );
}