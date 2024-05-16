import { RefreshControl, ScrollView, Text, View } from "react-native";
import Layout from "../layouts/Layout";
import { screenProps } from "../../types/screenprops";
import Welcome from "../contents/home/Welcome";
import Banner from "../ui/Banner";
import VehicleCount from "../contents/home/VehicleCount";
import LatestRecords from "../contents/record/LatestRecords";
import { useAuth } from "../../contexts/AuthContext";
import useVehicleCount from "../../data/home";
import { useEffect, useState } from "react";


const HomeScreen = ({ title, navigation, openedPage }: screenProps) => {

    const { user } = useAuth();

    if (!user) return null;

    const { data, mutate, isLoading } = useVehicleCount();

    const [bannerImages, setBannerImages] = useState<string[]>([]);

    useEffect(() => {
        if (!bannerImages.length) {
            const unique = new Date();
            setBannerImages([
                `https://firebasestorage.googleapis.com/v0/b/traffic-pulse-app.appspot.com/o/banner%2Fbanner1.png?alt=media&date=${unique}`,
                `https://firebasestorage.googleapis.com/v0/b/traffic-pulse-app.appspot.com/o/banner%2Fbanner2.png?alt=media&date=${unique}`,
                `https://firebasestorage.googleapis.com/v0/b/traffic-pulse-app.appspot.com/o/banner%2Fbanner3.png?alt=media&date=${unique}`
            ])
        }
    }, [bannerImages])

    if (isLoading) return null;

    const onRefresh = () => {
        mutate();
        setBannerImages([]);
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
                <Banner bannerImages={bannerImages} />
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