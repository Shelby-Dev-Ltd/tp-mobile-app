import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useAnalyticsSingle } from "../../../data/analytics";
import { LoaderScreen } from "react-native-ui-lib";
import { BezierLineChart } from "../../charts/BezierLineChart";

type RecordDetailProps = {
    id: number;
}

export const RecordDetail: React.FC<RecordDetailProps> = ({ id }) => {
    const { isLoading, data: record, mutate } = useAnalyticsSingle(id);

    useEffect(() => { console.log(record) }, [record]);

    if (isLoading) return <LoaderScreen />

    if (record.isAnalyzing) return (
        <View>
            <Text>{`Data for record ${id} is still being analyzed by our system..`}</Text>
        </View>
    )

    return (
        <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <BezierLineChart
                analyticsData={[record]}
            />
        </View>
    )
};