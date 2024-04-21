import React from "react";
import { View } from "react-native";
import RecordCard from "./RecordCard";
import { Record as RecordType } from "../../../types/record";

type RecordProps = {
    records: RecordType[];
}

const Record = ({ records }: RecordProps) => {
    return (
        <View>
            {
                records.map((record, index) => {
                    return (
                        <RecordCard
                            key={index}
                            location={record.location}
                            date={record.date}
                        />
                    )
                }
                )}
        </View>
    );
}

export default Record;
