import React, { useEffect, useState } from "react";
import { View, Dimensions, Text, ScrollView } from "react-native";
import { Colors, LoaderScreen, Image } from "react-native-ui-lib";
import { PieChart } from "react-native-chart-kit";
import Layout from "../layouts/Layout";
import { screenProps } from "../../types/screenprops";
import { BezierLineChart } from "../charts/BezierLineChart";
import { imagePlaceholders } from "../../config/placeholders";
import Analytics from "../contents/analytics/Analytics";

export default function AnalyticsScreen({ title, navigation, openedPage }: screenProps) {
    const vehicleData = [
        { name: "Truck", population: 30, color: '#03045e' }, // Blue
        { name: "Car", population: 40, color: '#0077b6' },   // Green
        { name: "Motorbike", population: 20, color: '#00b4d8' }, // Red
        { name: "Bus", population: 10, color: '#90e0ef' }   // Yellow
    ];

    const content = (
        <Analytics navigation={navigation} />
    );

    return (
        <Layout
            openedPage={openedPage}
            content={content}
            title={title}
            navigation={navigation}
            menuBar={true}
        />
    );
}
