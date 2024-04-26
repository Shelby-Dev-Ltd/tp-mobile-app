import { Dimensions, View } from "react-native";
import { Text } from "react-native-ui-lib";
import {
    PieChart as NativePieChart
} from "react-native-chart-kit";
import React from "react";
import { PieChartProps } from "../../types/chart";

// TODO: UNDONE
export const PieChart: React.FC<PieChartProps> = ({ data }) => {

    if (!data) return <></>;

    return (
        <View
            style={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignContent: 'center',
            }}
        >
            <Text text60>Bezier Line Chart</Text>
            <NativePieChart
                data={data}
                width={Dimensions.get("window").width - 40}
                height={220}
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
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[10, 50]}
                absolute
            />
        </View>
    )
}
