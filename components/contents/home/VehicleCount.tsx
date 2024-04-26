import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
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
                        style={[vehicleCountStyles.card, vehicleCountStyles.elevation, { backgroundColor: vehicle.cardColor }]}
                    >
                        <View style={vehicleCountStyles.icon}>
                            <FontAwesome5 name={vehicle.icon ? vehicle.icon : "truck-pickup"} size={70} color="black" />
                        </View>
                        <Text style={vehicleCountStyles.contentText}>
                            {`${vehicle.name}`}
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
