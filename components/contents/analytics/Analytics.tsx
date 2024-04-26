import React, { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import { NavigationType } from "../../../types/navigation";
import { imagePlaceholders } from "../../../config/placeholders";
import { BezierLineChart } from "../../charts/BezierLineChart";
import { useAnalytics } from "../../../data/analytics";
import { LoaderScreen } from "react-native-ui-lib";
import { DatasetsType } from "../../../types/chart";
import { Dataset } from "react-native-chart-kit/dist/HelperTypes";
import DonutChart from "../../charts/DonutChart";
import DonutChartContainer from "./DonutChartContainer";
import MapView, {LatLng, Marker, PROVIDER_GOOGLE} from "react-native-maps";
import { vehicleCountStyles } from "../../../styles/vehicleCount";
import useRecords from "../../../data/records";

type AnalyticsProps = {
    navigation: NavigationType
}

const Analytics = ({ navigation }: AnalyticsProps) => {
    
    const [origin, setOrigin] = useState<LatLng | null>(); //new
    const { isLoading, mutate, data: analyticsData } = useAnalytics();
    const { width, height } = Dimensions.get("window");
    const ASPECT_RATIO = width / (height/3);
    const LATITUDE_DELTA = 0.02;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const INITIAL_LAT = -6.284512;
    const INITIAL_LNG = 107.170716;
    const INITIAL_POSITION = {
        latitude: INITIAL_LAT,
        longitude: INITIAL_LNG,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };

    if (isLoading) return <LoaderScreen />;

    if (!analyticsData.length) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>No data found!</Text></View>
    )

    return (
        <ScrollView 
        style={{ flex: 1 }}>
            <Text style={vehicleCountStyles.text}>
                Map Address: 
            </Text>
           <MapView
           provider={PROVIDER_GOOGLE}
            initialRegion={INITIAL_POSITION}
            style={{
                height: 200,
                borderRadius: 20
            }}
            pitchEnabled
            zoomEnabled
            scrollEnabled={false}
            rotateEnabled={false}
            >
            <Marker coordinate={INITIAL_POSITION} />
            </MapView>
            <Text style={vehicleCountStyles.text}>
                Donut Chart: 
            </Text>
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
