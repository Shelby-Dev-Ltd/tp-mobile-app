import React, { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import { useAnalyticsSingle } from "../../../data/analytics";
import { LoaderScreen } from "react-native-ui-lib";
import { BezierLineChart } from "../../charts/BezierLineChart";

type RecordDetailProps = {
    id: number;
}

export const RecordDetail: React.FC<RecordDetailProps> = ({ id }) => {
    const { isLoading, data: record, mutate } = useAnalyticsSingle(id);

    const header = ['Bikes', 'Cars', 'Trucks'];

    if (isLoading) return <LoaderScreen />

    if (!record || record.isAnalyzing) {
        return (
            <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{`Data for record ${id} is still being analyzed by our system..`}</Text>
            </View>
        )
    }

    const tableData = [
        { id: 'header', data: header },
        { id: 'body', data: [record.BikeCount, record.CarCount, record.TruckCount] }
    ];

    return (
        <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 }}>
            <BezierLineChart
                analyticsData={[record]}
            />
            <FlatList
                data={tableData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    if (item.id === 'header') {
                        return (
                            <View style={styles.headerRow}>
                                {item.data.map((value, index) => (
                                    <Text key={index} style={styles.headerText}>{value}</Text>
                                ))}
                            </View>
                        )
                    } else {
                        return (
                            <View style={styles.row}>
                                {item.data.map((value, index) => (
                                    <Text key={index} style={styles.cellText}>{value}</Text>
                                ))}
                            </View>
                        )
                    }
                }}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: '#f0f0f0',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 5,
    },
    headerText: {
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    cellText: {
        flex: 1,
        textAlign: 'center',
    },
});