import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Card from "../../ui/Card";
import { recordStyles } from "../../../styles/record";
import { Record as RecordType } from "../../../types/record";

const LatestRecords = () => {

    const [records, setRecords] = useState<RecordType[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const mutate = async () => {
        setIsFetching(true);
        try {
            const res = await fetch(`${process.env.EXPO_PUBLIC_BASE_API_URL}/records`);
            console.log(res);
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

    const sortedLocations = records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    const latestLocations = sortedLocations.slice(0, 3)

    return (
        <View>
            <View style={recordStyles.row}>
                <Text style={recordStyles.text}>
                    Latest Record
                </Text>
                <Text style={recordStyles.textLink}>
                    View All
                </Text>
            </View>
            {latestLocations.map((location, index) => (
                <Card
                    key={index}
                    location={location.location}
                    date={location.date}
                />
            ))}
        </View>
    );
}

export default LatestRecords;
