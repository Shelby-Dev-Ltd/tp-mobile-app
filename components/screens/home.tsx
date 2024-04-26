import { ScrollView, Text, View } from "react-native";
import Layout from "../layouts/Layout";
import { screenProps } from "../../types/screenprops";
import Welcome from "../contents/home/Welcome";
import Banner from "../ui/Banner";
import VehicleCount from "../contents/home/VehicleCount";
import LatestRecords from "../contents/record/LatestRecords";
import { useAuth } from "../../contexts/AuthContext";
import useVehicleCount from "../../data/home";

const images = [
    "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
    "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
    "https://img.freepik.com/free-vector/abstract-geometric-round-shape-blue-background-design_1017-42785.jpg"
]

const HomeScreen = ({ title, navigation, openedPage }: screenProps) => {

    const { user } = useAuth();

    if (!user) return null;

    const { data } = useVehicleCount();

    const content = (
        <View style={{ flex: 1, paddingTop: 30, }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
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