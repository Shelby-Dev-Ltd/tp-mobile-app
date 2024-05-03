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

const images = [
    "https://img.jakpost.net/c/2023/02/01/2023_02_01_135079_1675230408._large.jpg",
    "https://www.insperity.com/wp-content/uploads/decision_making_process_1200x630-1.png",
    "https://grammarist.com/wp-content/uploads/Grammarist-Article-Graphic-V4-2023-01-10T134943.720-1024x478.png"
]

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
                <Banner images={images} />
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