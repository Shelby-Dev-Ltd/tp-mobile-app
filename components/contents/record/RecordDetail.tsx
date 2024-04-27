import React, { useEffect, useState } from "react";
import { Dimensions, RefreshControl, ScrollView, Text, View } from "react-native";
import { useRecordSingle } from "../../../data/records";
import { LoaderScreen } from "react-native-ui-lib";
import DonutChartContainer from "../analytics/DonutChartContainer";
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";

type RecordDetailProps = {
    id: number;
}

const { width, height } = Dimensions.get("window");

export const RecordDetail: React.FC<RecordDetailProps> = ({ id }) => {
    const { isLoading, data, mutate } = useRecordSingle(id);

    if (isLoading) return <LoaderScreen />

    if (data.isAnalyzing) {
        return (
            <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{`Data for record ${id} is still being analyzed by our system..`}</Text>
            </View>
        )
    }

    const ASPECT_RATIO = width / (height / 3);
    const LATITUDE_DELTA = 0.02;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const INITIAL_LAT = Number(data.record.latitude);
    const INITIAL_LNG = Number(data.record.longitude);
    const INITIAL_POSITION = {
        latitude: INITIAL_LAT,
        longitude: INITIAL_LNG,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    };

    const onRefresh = () => {
        mutate();
    };

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={isLoading}
                    onRefresh={onRefresh}
                    colors={['#2F80ED']}
                />
            }
        >
            <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                <View
                    style={{
                        height: 200,
                        width,
                    }}
                >
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        initialRegion={INITIAL_POSITION}
                        style={{
                            height: 200,
                            borderRadius: 20
                        }}
                        pitchEnabled
                        zoomEnabled
                        scrollEnabled={false}
                        rotateEnabled={false}
                    >
                        <Marker coordinate={INITIAL_POSITION} />
                    </MapView>
                </View>
                <Text>
                    {data.record.address}
                </Text>
                <DonutChartContainer isLoading={isLoading} analyticsData={[data.record.analytics]} />
            </View >
        </ScrollView>

    )
};