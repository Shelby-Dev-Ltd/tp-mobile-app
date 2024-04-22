import { Dimensions, View } from "react-native";
import { Text } from "react-native-ui-lib";
import {
    LineChart,
} from "react-native-chart-kit";
import React, { useEffect, useState } from "react";
import { DatasetsType, LineChartProps } from "../../types/chart";
import { Dataset } from "react-native-chart-kit/dist/HelperTypes";

export const BezierLineChart: React.FC<LineChartProps> = ({ analyticsData }) => {

    const [labels, setLabels] = useState<Array<string>>([]);
    const [datasets, setDatasets] = useState<DatasetsType>([]);

    // process data into chart input type
    useEffect(() => {
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

    if (!analyticsData || !datasets.length || !labels.length) return <></>;

    return (
        <View
            style={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignContent: 'center',
            }}
        >
            <LineChart
                data={{
                    labels,
                    datasets,
                }}
                width={Dimensions.get("window").width - 40}
                height={220}
                yAxisSuffix=" unit"
                yAxisInterval={1}
                chartConfig={{
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    backgroundGradientFrom: "#2F80ED",
                    backgroundGradientTo: "#91c0ff",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: 10,
                    alignItems: 'flex-start',
                    width: '100%',
                }}
            >
                <Text>🔴 Bike</Text>
                <Text>🔵 Car</Text>
                <Text>🟢 Truck</Text>
            </View>
        </View>
    )
}
