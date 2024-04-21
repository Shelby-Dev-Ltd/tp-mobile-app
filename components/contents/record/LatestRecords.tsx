import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import RecordCard from "./RecordCard";
import { recordStyles } from "../../../styles/record";
import { Record as RecordType } from "../../../types/record";
import useRecords from "../../../data/records";
import { LoaderScreen } from "react-native-ui-lib";

type LatestRecordProps = {
    navigation: any
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
            {records.map((location, index) => (
                <RecordCard
                    key={index}
                    location={location.location}
                    date={location.date}
                />
            ))}
        </View>
    );
}

export default LatestRecords;
