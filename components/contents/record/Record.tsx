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

    const NavigateToRecordDetail = (id: number) => {
        navigation.navigate("recordDetail", { id })
    };

    return (
        <View>
            {
                records.map((record, index) => {
                    return (
                        <RecordCard
                            key={index}
                            id={record.id}
                            location={record.location}
                            date={record.date}
                            onClick={NavigateToRecordDetail}
                        />
                    )
                }
                )}
        </View>
    );
}

export default Record;
