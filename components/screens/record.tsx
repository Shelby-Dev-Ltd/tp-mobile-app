import { Button, RefreshControl, ScrollView, Text, View } from "react-native";
import Layout from "../layouts/Layout";
import { screenProps } from "../../types/screenprops";
import { useEffect, useRef, useState } from "react";
import { Record as RecordType } from "../../types/record";
import Record from "../contents/record/Record";

export default function RecordScreen({ title, navigation, openedPage }: screenProps) {

    const [records, setRecords] = useState<RecordType[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const mutate = async () => {
        setIsFetching(true);
        try {
            const res = await fetch(`${process.env.EXPO_PUBLIC_BASE_API_URL}/records`);
            const data: ApiResponse = await res.json();

            if (data.error) throw Error(data.status.toString());

            const records: ApiResponse = data.data.records;

            setRecords(records as RecordType[]);
        } catch (e) {
            console.error(e);
        } finally {
            setIsFetching(false);
        }
    }

    useEffect(() => {
        mutate()
    }, []); //first fetch

    const onRefresh = () => {
        mutate();
    }

    const content =
        (<View style={{ flex: 1 }}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={isFetching}
                        onRefresh={onRefresh}
                    />
                }
            >
                <Record records={records} />
            </ScrollView>
        </View>)

    return (
        <Layout openedPage={openedPage} content={content} title={title} navigation={navigation} menuBar={true} />
    );
}