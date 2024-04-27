import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React from 'react';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';

interface Data {
  value: number;
  percentage: number | string;
  color: string;
}

type Props = {
  item: Data;
  index: number;
};

const RenderItem = ({ item, index }: Props) => {
  const { width } = useWindowDimensions();
  const images = [
    require("../../assets/vehicleCount/3d-car.png"),
    require("../../assets/vehicleCount/3d-bikes.png"),
    require("../../assets/vehicleCount/3d-truck.png"),
    require("../../assets/vehicleCount/3d-bus.png"),
  ];
  return (
    <Animated.View
      style={[styles.container, { width: width * 0.9 }]}
      entering={FadeInDown.delay(index * 200)}
      exiting={FadeOutDown}>
      <View style={styles.contentContainer}>
        <View style={[styles.color, { backgroundColor: item.color }]}>
          <Image
            source={images[index]}
            style={{
              width: 50,
              height: 50
            }}
          />
        </View>
        <Text style={styles.text}>{item.percentage}%</Text>
        <Text style={styles.text}>{item.value}</Text>
      </View>
    </Animated.View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    marginBottom: 10,
    backgroundColor: '#f4f7fc',
    borderRadius: 20,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  color: {
    width: 60,
    height: 60,
    borderRadius: 10,
    alignItems: 'center'
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
});