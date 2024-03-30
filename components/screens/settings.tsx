import { Pressable, Text, View } from "react-native";
import Layout from "../layouts/Layout";
import { screenProps } from "../../types/screenprops";
import { useAuth } from "../../contexts/AuthContext";

export default function SettingsScreen({ title, navigation, openedPage }: screenProps) {
    const { isLoggedIn, logout } = useAuth();

    const content =
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Pressable onPress={() => logout()}>
                <Text>
                    Logout
                </Text>
            </Pressable>
        </View>


    return (
        <Layout openedPage={openedPage} content={content} title={title} navigation={navigation} menuBar={true} />
    );
}