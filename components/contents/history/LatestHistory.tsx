import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Card from "../../ui/Card";
import { historyStyles } from "../../../styles/history";

type LocationProps = {
    locations: { location: string; date: string }[] 
}

const LatestHistory = ({ locations }: LocationProps) => {
    const sortedLocations = locations.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    const latestLocations = sortedLocations.slice(0, 3)

    return (
        <View>
            <View style={historyStyles.row}>
                <Text style={historyStyles.text}>
                    Latest History
                </Text>
                <Text style={historyStyles.textLink}>
                    View All
                </Text>
            </View>
            {latestLocations.map((location, index) => (
                <Card 
                    key={index} 
                    location={location.location} 
                    date={location.date}
                />
            ))}
        </View>
    );
}

export default LatestHistory;
