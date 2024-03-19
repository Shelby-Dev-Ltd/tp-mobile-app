import { Button, ScrollView, Text, View } from "react-native";
import Layout from "../layouts/Layout";
import { screenProps } from "../../types/screenprops";
import History from "../contents/history/History";

const locations = [
    {location: "Jl. Mekarmukti, Bekasi, Jawa Barat, Indonesia", date: "10-04-2023"},
    {location: "Jl. Mekarmukti, Bekasi, Jawa Barat, Indonesia", date: "10-04-2023"},
    {location: "Jl. Mekarmukti, Bekasi, Jawa Barat, Indonesia", date: "10-04-2023"},
    {location: "Jl. Mekarmukti, Bekasi, Jawa Barat, Indonesia", date: "10-03-2023"},
    {location: "Jl. Mekarmukti, Bekasi, Jawa Barat, Indonesia", date: "10-03-2023"},
    {location: "Jl. Mekarmukti, Bekasi, Jawa Barat, Indonesia", date: "10-03-2023"},
    {location: "Jl. Mekarmukti, Bekasi, Jawa Barat, Indonesia", date: "10-03-2023"}
]

export default function HistoryScreen({ title, navigation, openedPage }: screenProps) {

    const content =
        <View style={{ flex: 1}}>
        <ScrollView>
            <History locations={locations} />
        </ScrollView>
        </View>


    return (
        <Layout openedPage={openedPage} content={content} title={title} navigation={navigation} menuBar={false} />
    );
}