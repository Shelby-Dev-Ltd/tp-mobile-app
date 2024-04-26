import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { NavigationType } from "../../../types/navigation";
import { imagePlaceholders } from "../../../config/placeholders";
import { BezierLineChart } from "../../charts/BezierLineChart";
import { useAnalytics } from "../../../data/analytics";
import { LoaderScreen } from "react-native-ui-lib";
import { DatasetsType } from "../../../types/chart";
import { Dataset } from "react-native-chart-kit/dist/HelperTypes";
import DonutChart from "../../charts/DonutChart";
import DonutChartContainer from "./DonutChartContainer";
import MapView from "react-native-maps";

type AnalyticsProps = {
    navigation: NavigationType
}

const Analytics = ({ navigation }: AnalyticsProps) => {

    const { isLoading, mutate, data: analyticsData } = useAnalytics();

    if (isLoading) return <LoaderScreen />;

    if (!analyticsData.length) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>No data found!</Text></View>
    )

    return (
        <ScrollView 
        style={{ flex: 1 }}>
           <MapView
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            pitchEnabled={false}
            zoomEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            />
            <DonutChartContainer analyticsData={analyticsData}/>
            {/* <View style={{ padding: 10 }}>
                <View style={{ marginBottom: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: -30 }}></Text>
                    <Image
                        source={{ uri: imagePlaceholders.analytics.trafficThumbnail }}
                    />
                </View>
                <View style={{ marginBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Monthly Basis</Text>
                    <BezierLineChart
                        analyticsData={analyticsData}
                    />
                </View> */}
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
            {/* </View> */}
        </ScrollView>
    );
}

export default Analytics;
