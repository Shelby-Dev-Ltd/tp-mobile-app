import { ScrollView, Text, View } from "react-native";
import Layout from "../layouts/Layout";
import { screenProps } from "../../types/screenprops";
import Welcome from "../contents/Welcome";
import Banner from "../ui/Banner";
import VehicleCount from "../contents/VehicleCount";
import LatestRecords from "../contents/record/LatestRecords";
import { useAuth } from "../../contexts/AuthContext";

const images = [
    "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
    "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
    "https://img.freepik.com/free-vector/abstract-geometric-round-shape-blue-background-design_1017-42785.jpg"
]

export default function HomeScreen({ title, navigation, openedPage }: screenProps) {

    const content =
        <View style={{ flex: 1 }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <Welcome />
                <Banner images={images} />
                <VehicleCount />
                <LatestRecords />
            </ScrollView>
        </View>

    return (
        <Layout openedPage={openedPage} content={content} title={title} navigation={navigation} menuBar={true} />
    );
}