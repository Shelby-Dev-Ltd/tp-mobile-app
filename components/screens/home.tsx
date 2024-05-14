import { RefreshControl, ScrollView, Text, View } from "react-native";
import Layout from "../layouts/Layout";
import { screenProps } from "../../types/screenprops";
import Welcome from "../contents/home/Welcome";
import Banner from "../ui/Banner";
import VehicleCount from "../contents/home/VehicleCount";
import LatestRecords from "../contents/record/LatestRecords";
import { useAuth } from "../../contexts/AuthContext";
import useVehicleCount from "../../data/home";
import { useEffect } from "react";


const HomeScreen = ({ title, navigation, openedPage }: screenProps) => {

    const { user } = useAuth();

    if (!user) return null;

    const { data, mutate, isLoading } = useVehicleCount();

    if (isLoading) return null;

    const onRefresh = () => {
        mutate();
    };

    const content = (
        <View style={{ flex: 1 }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={onRefresh}
                        colors={['#2F80ED']}
                    />
                }
            >
                <Welcome
                    user={user}
                />
                <Banner />
                <VehicleCount
                    vehicles={data}
                />
                <LatestRecords navigation={navigation} />
            </ScrollView>
        </View>
    )

    return (
        <Layout openedPage={openedPage} content={content} title={title} navigation={navigation} menuBar={true} />
    );
}

export default HomeScreen;