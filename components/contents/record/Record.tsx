import React, { ReactNode, useEffect, useState } from "react";
import { FlatList, PanResponder, RefreshControl, Text, ToastAndroid, View } from "react-native";
import RecordCard from "./RecordCard";
import { Record as RecordType } from "../../../types/record";
import { NavigationType } from "../../../types/navigation";

type RecordProps = {
    navigation: NavigationType;
    records: RecordType[];
    isLoading: boolean;
    onRefresh: () => void;
    route: any;
}

const Record = ({ route, navigation, records, isLoading, onRefresh }: RecordProps) => {
    const params = route.params;

    useEffect(() => {
        if (params && params.refresh) {
            onRefresh();
        };
    }, [params])

    if (!records.length) return (<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}><Text>No Records</Text></View>)

    return (
        <View>
            <FlatList
                data={records}
                renderItem={({ item }) =>
                    <RecordCard
                        id={item.id}
                        address={item.address}
                        date={item.date}
                        isAnalyzed={item.analytics.id !== 1 ? true : false}
                        onClick={() => navigation.navigate("recordDetail", { id: item.id })}
                    />
                }
                keyExtractor={item => item.id.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={onRefresh}
                        colors={['#2F80ED']}
                    />
                }
            />
        </View>
    );
}

export default Record;
