import React, { useEffect, useState } from "react";
import { Dimensions, Image, RefreshControl, ScrollView, Text, View } from "react-native";
import { NavigationType } from "../../../types/navigation";
import { useAnalytics } from "../../../data/analytics";
import { LoaderScreen } from "react-native-ui-lib";
import DonutChartContainer from "./DonutChartContainer";
import Card from "../../ui/Card";

type AnalyticsProps = {
    navigation: NavigationType
}

const { width, height } = Dimensions.get('window');

const Analytics = ({ navigation }: AnalyticsProps) => {

    const { isLoading, mutate, data: analyticsData } = useAnalytics();

    const onRefresh = () => {
        mutate();
    };

    if (isLoading) return <LoaderScreen />;

    return (
        <ScrollView
            style={{
                flex: 1,
                height,
            }}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={isLoading}
                    onRefresh={onRefresh}
                    colors={['#2F80ED']}
                />
            }
        >
            {
                !analyticsData || (Array.isArray(analyticsData) && !analyticsData.length) ?
                    (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>No data found!</Text></View>)
                    : (
                        <View
                            style={{
                                height: '100%',
                                width: '100%',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            }}
                        >
                            <Card
                                marginTop={10}
                                marginBottom={10}
                                width={width - 40}
                            >
                                <DonutChartContainer
                                    isLoading={isLoading}
                                    analyticsData={analyticsData}
                                />
                            </Card>
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
                        </View>
                    )
            }
        </ScrollView >
    );
}

export default Analytics;
