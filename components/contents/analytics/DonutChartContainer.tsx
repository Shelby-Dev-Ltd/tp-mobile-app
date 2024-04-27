import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import DonutChart from '../../charts/DonutChart';
import { useFont } from '@shopify/react-native-skia';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { calculatePercentage, generateRandomNumbers } from '../../../data/donutChart';
import RenderItem from '../../charts/RenderItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAnalytics } from '../../../data/analytics';
import { AnalyticsData } from '../../../types/analytics';
import { LoaderScreen } from 'react-native-ui-lib';

interface Data {
  value: number;
  percentage: number | string;
  color: string;
}

const RADIUS = 160;
const STROKE_WIDTH = 30;
const OUTER_STROKE_WIDTH = 46;
const GAP = 0.04;

export const DonutChartContainer = ({ analyticsData, isLoading }: { analyticsData: AnalyticsData[], isLoading: boolean }) => {

  const n = 4;
  const [data, setData] = useState<Data[]>([]);
  const totalValue = useSharedValue(0);
  const decimals = useSharedValue<number[]>([]);
  const colors = ["#e28743", "#abdbe3", "#8A76F7", "#c4ffec"];

  const generateData = () => {
    const totalCar = analyticsData.reduce((acc, item) => acc + item.CarCount, 0);
    const totalBike = analyticsData.reduce((acc, item) => acc + item.BikeCount, 0);
    const totalTruck = analyticsData.reduce((acc, item) => acc + item.TruckCount, 0);
    const totalBus = analyticsData.reduce((acc, item) => acc + item.BusCount, 0);
    const total = totalCar + totalBike + totalTruck + totalBus;

    const generatePercentages = [
      (totalCar / total) * 100,
      (totalBike / total) * 100,
      (totalTruck / total) * 100,
      (totalBus / total) * 100
    ];

    const generateDecimals = generatePercentages.map(
      number => Number(number.toFixed(0)) / 100
    );

    totalValue.value = withTiming(total, { duration: 1000 });
    decimals.value = [...generateDecimals];

    const arrayOfObjects = [
      { value: totalCar, percentage: generatePercentages[0].toFixed(1), color: colors[0] },
      { value: totalBike, percentage: generatePercentages[1].toFixed(1), color: colors[1] },
      { value: totalTruck, percentage: generatePercentages[2].toFixed(1), color: colors[2] },
      { value: totalBus, percentage: generatePercentages[3].toFixed(1), color: colors[3] },
    ];

    setData(arrayOfObjects);
  };

  const font = useFont(require('../../../assets/fonts/Roboto-Bold.ttf'), 60);
  const smallFont = useFont(require('../../../assets/fonts/Roboto-Light.ttf'), 25);

  useEffect(() => {
    generateData()
  }, [analyticsData]);

  if (!font || !smallFont || !analyticsData.length) {
    return null;
  }

  if (isLoading) return <LoaderScreen />

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: 'white',
    }}>
      <ScrollView
        contentContainerStyle={{ alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            gap: 20,
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <View style={styles.chartContainer}>
            <DonutChart
              radius={RADIUS}
              gap={GAP}
              strokeWidth={STROKE_WIDTH}
              outerStrokeWidth={OUTER_STROKE_WIDTH}
              font={font}
              smallFont={smallFont}
              totalValue={totalValue}
              n={n}
              decimals={decimals}
              colors={colors}
            />
          </View>
          {/* <TouchableOpacity onPress={generateData} style={styles.button}>
          <Text style={styles.buttonText}>Generate</Text>
        </TouchableOpacity> */}
          <View>
            {data.map((item, index) => {
              return (<RenderItem item={item} key={index} index={index} />);
            })}
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  chartContainer: {
    width: RADIUS * 2,
    height: RADIUS * 2,
  },
  button: {
    marginVertical: 40,
    backgroundColor: '#f4f7fc',
    paddingHorizontal: 60,
    borderRadius: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
  },
});

export default DonutChartContainer;