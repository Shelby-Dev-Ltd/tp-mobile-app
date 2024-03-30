import React, { useEffect, useState } from "react";
import { View, Dimensions, Text, ScrollView } from "react-native";
import { Colors, LoaderScreen, Image } from "react-native-ui-lib";
import { PieChart } from "react-native-chart-kit";
import Layout from "../layouts/Layout";
import { screenProps } from "../../types/screenprops";
import { BezierLineChart } from "../charts/BezierLineChart";
import { imagePlaceholders } from "../../config/placeholders";

export default function AnalyticsScreen({ title, navigation, openedPage }: screenProps) {
    const [isLoadingContent, setIsLoadingContent] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => setIsLoadingContent(false), 3000); // dummy loading
    }, []);

    const vehicleData = [
        { name: "Truck", population: 30, color: '#03045e' }, // Blue
        { name: "Car", population: 40, color: '#0077b6' },   // Green
        { name: "Motorbike", population: 20, color: '#00b4d8' }, // Red
        { name: "Bus", population: 10, color: '#90e0ef' }   // Yellow
    ];

    const content = (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ padding: 10 }}>
                <View style={{ marginBottom: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: -30 }}></Text>
                    <Image cover source={{ uri: imagePlaceholders.analytics.trafficThumbnail }} />
                </View>
                <View style={{ marginBottom: 20 }}>
                    <BezierLineChart />
                </View>
                <View>
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
                </View>
            </View>
        </ScrollView>
    );

    return (
        <Layout
            openedPage={openedPage}
            content={isLoadingContent ? <LoaderScreen message={`Loading ${title}`} color={Colors.grey40} /> : content}
            title={title}
            navigation={navigation}
            menuBar={true}
        />
    );
}
