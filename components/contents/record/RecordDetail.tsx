import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useRecordSingle } from "../../../data/records";
import { LoaderScreen } from "react-native-ui-lib";
import DonutChartContainer from "../analytics/DonutChartContainer";

type RecordDetailProps = {
    id: number;
}

export const RecordDetail: React.FC<RecordDetailProps> = ({ id }) => {
    const { isLoading, data, mutate } = useRecordSingle(id);

    if (isLoading) return <LoaderScreen />

    if (data.isAnalyzing) {
        return (
            <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{`Data for record ${id} is still being analyzed by our system..`}</Text>
            </View>
        )
    }

    return (
        <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 }}>
            <DonutChartContainer analyticsData={[data.record.analytics]} />
        </View>
    )
};