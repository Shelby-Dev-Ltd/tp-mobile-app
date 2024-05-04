import React, { useEffect, useState } from "react";
import { Dimensions, RefreshControl, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { useRecordSingle } from "../../../data/records";
import { LoaderScreen } from "react-native-ui-lib";
import DonutChartContainer from "../analytics/DonutChartContainer";
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Card from "../../ui/Card";
import Popup from "../../ui/Popup";
import { NavigationType } from "../../../types/navigation";
import axios from "axios";

type RecordDetailProps = {
    id: number;
    navigation: NavigationType;
}

const { width, height } = Dimensions.get("window");

export const RecordDetail: React.FC<RecordDetailProps> = ({ id, navigation }) => {
    const { isLoading, data, mutate } = useRecordSingle(id);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onOpen = () => {
        setIsOpen(true);
    };

    const onClose = () => {
        setIsOpen(false);
    };

    if (isLoading) return <LoaderScreen />

    if (data && 'isAnalyzing' in data && data.isAnalyzing) {
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

    const getDecision = (d: string): Array<string> => {
        switch (d) {
            case 'MIDDLE_HIGH':
                return [
                    "This location is suitable for businesses or shopping centers. The predominance of cars indicates a large potential market. With a high number of cars, this location is likely a hub of economic activity, allowing various types of businesses to thrive and attract many visitors.",
                    "This location may be suitable for various retail businesses such as shopping malls, supermarkets, or department stores. Additionally, restaurants, cafes, or entertainment centers can also thrive here due to the high traffic volume and large potential market."
                ];
            case 'MIDDLE_LOW':
                return [
                    "This location may be suitable for schools or residential areas. With a high number of motorcycles, it indicates active individual mobility. This could indicate that the location is friendly to the local community or suitable for education with easy access for students and educators.",
                    "This location is suitable for establishing middle or elementary schools. With high individual mobility, accessibility for students and parents becomes easier. Additionally, tutoring centers or training centers can also function well here."
                ];
            case 'INDUSTRIAL':
                return [
                    "This location is suitable for industries or warehouses. With the predominance of trucks, it indicates intensive logistic activities. This may be an industrial area or a distribution center where goods are transported and distributed on a large scale.",
                    "This location can be ideal for government offices, post offices, or public service centers. Due to intensive logistic activities, the availability of space for warehouses or storage can also be an important consideration."
                ];
            case 'TOURISM':
                return [
                    "This location is suitable for the tourism sector. The presence of numerous buses indicates a significant flow of tourists. It can be a popular tourist destination or a starting point for travel to nearby attractions.",
                    "This location is suitable for developing tourist attractions such as hotels, tourist sites, or recreational facilities. With a significant flow of tourists, hospitality businesses, restaurants, or souvenir shops can also thrive here."
                ];
            case 'MIXED':
                return [
                    "This location has a diverse range of activities. This could indicate a variety of functions or the complexity of activities in the area. It can be an attractive place for various users, such as businesses, residences, or community activity centers.",
                    "This location can be an interesting place for various businesses, including corporate offices, grocery stores, restaurants, or even sports and recreational facilities. The complexity of activities in this area offers opportunities for various types of businesses and services."
                ];
            default:
                return [];
        }
    };

    const deleteRecord = async (id: number) => {
        try {
            await axios.delete(`${process.env.EXPO_PUBLIC_BASE_API_URL}/records/${id}`);

            ToastAndroid.show('Deleted', ToastAndroid.LONG);
            onClose();
            navigation.navigate('records', { refresh: true });
        } catch (e) {
            console.error(e);
            ToastAndroid.show('Failed to delete', ToastAndroid.LONG);
        }
    };

    const onRefresh = () => {
        mutate();
    };

    return (
        <>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={onRefresh}
                        colors={['#2F80ED']}
                    />
                }
                showsVerticalScrollIndicator={false}
                style={{
                    height,
                }}
            >
                <View
                    style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        height: '100%',
                        paddingBottom: 10,
                    }}
                >

                    <View
                        style={{
                            flexDirection: 'column',
                            flex: 1,
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            gap: 10,
                        }}>
                        <Card
                            width={width - 40}
                            height={300}
                        >
                            <View
                                style={{
                                    height: 200,
                                    width: width - 50,
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
                        </Card>
                    </View>

                    <Card
                        width={width - 40}
                        height={840}
                    >
                        <DonutChartContainer isLoading={isLoading} analyticsData={[data.record.analytics]} />
                    </Card>

                    <View
                        style={{
                            width: '100%',
                            height: '100%',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 10,
                        }}
                    >
                        {
                            getDecision(data.record.analytics.decision).map((d, i) => (
                                <View
                                    key={i}
                                    style={{
                                        height: 150,
                                    }}
                                >
                                    <Card
                                        key={i}
                                        width={width - 40}
                                    >
                                        <View
                                            key={i}
                                            style={{
                                                overflow: 'scroll',
                                                height: 150,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    flex: 1,
                                                    color: 'black',
                                                    textAlign: 'left',
                                                    fontSize: 16,
                                                }}
                                            >{d}</Text>
                                        </View>

                                    </Card>
                                </View>

                            ))
                        }
                        <TouchableOpacity
                            onPress={() => onOpen()}
                            style={{
                                width: '100%',
                                height: 50,
                                backgroundColor: '#ff3056',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }}
                            >
                                Delete</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView >
            <Popup
                isVisible={isOpen}
                title="Are you sure you want to delete record?"
            >
                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 10,
                }}>
                    <TouchableOpacity
                        onPress={() => onClose()}
                        style={{
                            height: 44,
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#fff',
                            paddingVertical: 10,
                            marginVertical: 10,
                            width: 140,
                            borderColor: '#25c458',
                            borderWidth: 1
                        }}
                    >
                        <Text
                            style={{
                                color: '#25c458',
                                fontSize: 14,
                                fontWeight: '600',
                            }}
                        >
                            No
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => deleteRecord(id)}
                        style={{
                            height: 44,
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#fff',
                            paddingVertical: 10,
                            marginVertical: 10,
                            width: 140,
                            borderColor: '#d62211',
                            borderWidth: 1
                        }}
                    >
                        <Text
                            style={{
                                color: '#d62211',
                                fontSize: 14,
                                fontWeight: '600',
                            }}
                        >
                            Yes
                        </Text>
                    </TouchableOpacity>
                </View>
            </Popup>
        </>

    )
};