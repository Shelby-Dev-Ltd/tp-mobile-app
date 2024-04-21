import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { NavigationType } from "../../../types/navigation";
import { imagePlaceholders } from "../../../config/placeholders";
import { BezierLineChart } from "../../charts/BezierLineChart";
import useAnalytics from "../../../data/analytics";
import { LoaderScreen } from "react-native-ui-lib";
import { DatasetsType } from "../../../types/chart";
import { Dataset } from "react-native-chart-kit/dist/HelperTypes";

type AnalyticsProps = {
    navigation: NavigationType
}

const Analytics = ({ navigation }: AnalyticsProps) => {

    const { isLoading, mutate, data: analyticsData } = useAnalytics();

    const [labels, setLabels] = useState<Array<string>>([]);
    const [datasets, setDatasets] = useState<DatasetsType>([]);

    // process data into chart input type
    useEffect(() => {
        if (isLoading) return;
        const newLabels: Array<string> = analyticsData.map((data) => new Date(data.date.toString()).toLocaleDateString());

        const newBikeData: Dataset = {
            data: analyticsData.map((data) => {
                const { BikeCount } = data;
                return BikeCount;
            }),
            color: () => "red"
        }

        const newCarData: Dataset = {
            data: analyticsData.map((data) => {
                const { CarCount } = data;
                return CarCount;
            }),
            color: () => "blue"
        }

        const newTruckData: Dataset = {
            data: analyticsData.map((data) => {
                const { TruckCount } = data;
                return TruckCount;
            }),
            color: () => "green"
        }

        setLabels(newLabels);
        setDatasets([newBikeData, newCarData, newTruckData]);

    }, [analyticsData]);

    if (isLoading || (!labels.length && !datasets.length)) return <LoaderScreen />;

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ padding: 10 }}>
                <View style={{ marginBottom: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: -30 }}></Text>
                    <Image
                        source={{ uri: imagePlaceholders.analytics.trafficThumbnail }}
                    />
                </View>
                <View style={{ marginBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Monthly Basis</Text>
                    <BezierLineChart
                        labels={labels}
                        datasets={datasets}
                    />
                </View>
                {/* TODO: ADD PIE CHART */}
                {/* <View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Pie Chart</Text>
                    <PieChart
                        data={vehicleData}
                        width={Dimensions.get('window').width}
                        height={220}
                        chartConfig={{
                            backgroundColor: Colors.white,
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        }}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        absolute
                    />
                </View> */}
            </View>
        </ScrollView>
    );
}

export default Analytics;
