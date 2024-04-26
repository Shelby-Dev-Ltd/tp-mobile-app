import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { vehicleCountStyles } from "../../../styles/vehicleCount";
import { FontAwesome5 } from '@expo/vector-icons';
import { VehicleCountProps } from "../../../types/home";

const VehicleCount: React.FC<VehicleCountProps> = ({ vehicles }) => {

    if (!vehicles || !vehicles.length) return null;

    return (
        <View>
            <Text style={vehicleCountStyles.text}>
                Vehicle Count
            </Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {vehicles.map((vehicle, index) => (
                    <View
                        key={index}
                        style={[vehicleCountStyles.card, { backgroundColor: vehicle.cardColor }]}
                    >
                        <View style={vehicleCountStyles.icon}>
                            <Image
                             source={vehicle.icon}
                             style={{ width: 100, height: 100 }}
                            />
                        </View>
                        <Text style={vehicleCountStyles.contentText}>
                            {`${vehicle.name}`}:
                            {"\n"}
                            {`${vehicle.count}`}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

export default VehicleCount;
