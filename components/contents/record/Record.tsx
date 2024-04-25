import React from "react";
import { View } from "react-native";
import RecordCard from "./RecordCard";
import { Record as RecordType } from "../../../types/record";
import { NavigationType } from "../../../types/navigation";

type RecordProps = {
    navigation: NavigationType;
    records: RecordType[];
}

const Record = ({ navigation, records }: RecordProps) => {

    return (
        <View>
            {
                records.map((record, index) => {
                    return (
                        <RecordCard
                            key={index}
                            id={record.id}
                            address={record.address}
                            longitude={record.longitude}
                            latitude={record.latitude}
                            date={record.date}
                            onClick={() => navigation.navigate("recordDetail", { id: record.id })}
                        />
                    )
                }
                )}
        </View>
    );
}

export default Record;
