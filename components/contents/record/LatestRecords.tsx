import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import RecordCard from "./RecordCard";
import { recordStyles } from "../../../styles/record";
import { Record as RecordType } from "../../../types/record";
import useRecords from "../../../data/records";
import { LoaderScreen } from "react-native-ui-lib";
import { NavigationType } from "../../../types/navigation";

type LatestRecordProps = {
    navigation: NavigationType
};

const LatestRecords: React.FC<LatestRecordProps> = ({ navigation }) => {

    const { isLoading, data: records } = useRecords();

    if (isLoading) return <LoaderScreen />

    return (
        <View>
            <View style={recordStyles.row}>
                <Text style={recordStyles.text}>
                    Latest Records
                </Text>
                <Pressable
                    onPress={() => navigation.navigate('records')}
                >
                    <Text style={recordStyles.textLink}>
                        View All
                    </Text>
                </Pressable>

            </View>
            {records.slice(0, 3).map((record, index) => (
                <RecordCard
                    key={index}
                    id={record.id}
                    address={record.address}
                    longitude={record.longitude}
                    latitude={record.latitude}
                    date={record.date}
                    onClick={() => navigation.navigate("recordDetail", { id: record.id })}
                />
            ))}
        </View>
    );
}

export default LatestRecords;
