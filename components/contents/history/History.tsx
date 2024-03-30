import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Card from "../../ui/Card";

type LocationProps = {
    locations: { location: string; date: string }[] 
}

const History = ({ locations }: LocationProps) => {
    return (
        <View>
            {locations.map((location, index) => (
                <Card 
                    key={index} 
                    location={location.location} 
                    date={location.date}
                />
            ))}
        </View>
    );
}

export default History;
