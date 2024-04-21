import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { vehicleCountStyles } from "../../../styles/vehicleCount";
import { FontAwesome5 } from '@expo/vector-icons';

const vehicles = [
    { type: "car", count: 11, color: "#DFF1FF" },
    { type: "motorcycle", count: 5, color: "#E8FFEB" },
    { type: "bicycle", count: 5, color: "#FFECEF" },
    { type: "truck", count: 8, color: "#DFF1FF" }
];

const VehicleCount = () => {
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
                        style={[vehicleCountStyles.card, vehicleCountStyles.elevation, { backgroundColor: vehicle.color }]}
                    >
                        <View style={vehicleCountStyles.icon}>
                            <FontAwesome5 name={vehicle.type} size={70} color="black" />
                        </View>
                        <Text style={vehicleCountStyles.contentText}>
                            {`${vehicle.type}:`}
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
