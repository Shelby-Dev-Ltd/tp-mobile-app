import { Dimensions, View } from "react-native";
import { Text } from "react-native-ui-lib";
import {
    LineChart,
} from "react-native-chart-kit";
import React, { useEffect } from "react";
import { LineChartProps } from "../../types/chart";

export const BezierLineChart: React.FC<LineChartProps> = ({ labels, datasets }) => {

    if (!datasets) return <></>;

    return (
        <View
            style={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignContent: 'center',
            }}
        >
            <Text text60>Bezier Line Chart</Text>
            <LineChart
                data={{
                    labels,
                    datasets,
                }}
                width={Dimensions.get("window").width - 40}
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1}
                chartConfig={{
                    backgroundColor: "#2F80ED",
                    decimalPlaces: 2,
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
        </View>
    )
}
