import React, { useEffect } from "react";
import { View } from "react-native";
import Card from "../../ui/Card";
import { Record as RecordType } from "../../../types/record";
import { LoaderScreen } from "react-native-ui-lib";

type RecordProps = {
    records: RecordType[];
}

const Record = ({ records }: RecordProps) => {
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
