import React from "react";
import { View } from "react-native";
import Card from "../../ui/Card";
import { Record as RecordType } from "../../../types/record";
import { LoaderScreen } from "react-native-ui-lib";

type RecordProps = {
    records: RecordType[];
    isLoading: boolean;
}

const Record = ({ records, isLoading }: RecordProps) => {
    if (isLoading) return <LoaderScreen />;

    return (
        <View>
            {
                records.map((record, index) => {
                    return (
                        <Card
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
