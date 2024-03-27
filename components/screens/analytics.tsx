import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { ActivityRings } from 'react-native-activity-rings';
import { LineChart } from 'react-native-chart-kit';
import Layout from '../layouts/Layout';
import { screenProps } from '../../types/screenprops';
import { Colors, LoaderScreen } from 'react-native-ui-lib';
import { BezierLineChart } from '../charts/BezierLineChart';
import { imagePlaceholders } from '../../config/placeholders';

interface VisualPageProps {}

interface VisualPageState {}

const activityData = [
    { label: 'Truck', value: 0.5, color: '#03045e' },
    { label: 'Car', value: 0.3, color: '#0077b6' },
    { label: 'Bike', value: 0.1, color: '#00b4d8' },
    { label: 'Bus', value: 0.2, color: '#90e0ef' },
];

const activityConfig = {
    width: 200,
    height: 200,
};

const monthlyVehicleData = [
    { month: 'Jan', amount: 120 },
    { month: 'Feb', amount: 200 },
    { month: 'Mar', amount: 80 },
    { month: 'Apr', amount: 50 },
    { month: 'May', amount: 120 },
    { month: 'Jun', amount: 200 },
    { month: 'Jul', amount: 80 },
    { month: 'Aug', amount: 50 },
    { month: 'Sept', amount: 120 },
    { month: 'Oct', amount: 200 },
    { month: 'Nov', amount: 80 },
    { month: 'Dec', amount: 50 },
];

const textChartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black color for text
    fontFamily: 'Arial',
    decimalPlaces: 0,
    propsForLabels: {
        fontFamily: 'Arial',
        color: '#000000', // Set the text color to black
    },
};

const VisualPage: React.FC<VisualPageProps> = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF', paddingTop: 50, paddingLeft: 20, paddingRight: 40, paddingBottom: 30 }}>
            <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 20, fontWeight: 'bold' }}>History</Text>
            <Text style={{ textAlign: 'left', fontSize: 16, marginTop: 20, paddingTop: 30 }}>Daily Vehicle Pass</Text>

            <ActivityRings
                legend={true}
                data={activityData}
                config={activityConfig}
                theme={'light'}
            />

            <Text style={{ textAlign: 'left', fontSize: 16, marginTop: 20, marginBottom: 20 }}>Monthly Vehicle Pass</Text>
            <View style={{ alignItems: 'center' }}>
                <LineChart
                    data={{
                        labels: monthlyVehicleData.map(item => item.month),
                        datasets: [
                            {
                                data: monthlyVehicleData.map(item => item.amount),
                                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Blue color for line chart
                                strokeWidth: 2 // Optional, defaults to 2
                            },
                        ],
                    }}
                    width={350}
                    height={220}
                    chartConfig={textChartConfig}
                    bezier
                    yAxisLabel=""
                    yAxisSuffix=""
                    xLabelsOffset={-10}
                    yAxisInterval={1} // Display every month
                    verticalLabelRotation={30}
                    xLabelStyle={{ fontFamily: 'Arial', color: '#000000' }} // Set x-axis text color to black
                    fromZero={true}
                />
            </View>
        </View>
    );
};

const AnalyticsScreen: React.FC<screenProps> = ({ title, navigation, openedPage }) => {
    const [isLoadingContent, setIsLoadingContent] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => setIsLoadingContent(false), 3000); // dummy loading
    }, []);

    const content = (
        <View style={{ flex: 1, alignItems: 'baseline', justifyContent: 'flex-start' }}>
            <View style={{ flex: 0.5 }}>
                <Image cover source={{ uri: imagePlaceholders.analytics.trafficThumbnail }} />
                <BezierLineChart />
            </View>
            <VisualPage />
        </View>
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
};

export default AnalyticsScreen;
