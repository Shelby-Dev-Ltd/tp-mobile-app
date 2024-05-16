import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./home";
import RecordScreen from "./record";
import VideoScreen from "./video";
import AnalyticscScreen from "./analytics";
import EditProfile from "./profile";
import { RoutePropsType } from "../../types/navigation";
import RecordDetailScreen from "./record-detail";
import { Image, Text, View } from "react-native";
import { SERVERLOGO } from "../../assets";;

const Stack = createNativeStackNavigator();

export default function BaseScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        options={{
          title: "Traffic Pulse",
          headerLeft: () =>
            <View style={{ width: 50, height: 60, padding: 4 }}>
              <Image
                style={{ width: 50, height: 60, transform: [{ scale: 0.7 }] }}
                source={require("../../assets/server-logo.png")}
              />
            </View>,
          animation: "fade",
          headerShadowVisible: false,
        }}

      >
        {(props: RoutePropsType) => (
          <HomeScreen
            {...props}
            title={props.route.name}
            navigation={props.navigation}
            openedPage={props.route.name}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="records"
        options={{
          title: "Records",
          headerLeft: () => <></>,
          animation: "none",
          headerShadowVisible: false,
        }}
      >
        {(props: RoutePropsType) => (
          <RecordScreen
            {...props}
            title={props.route.name}
            navigation={props.navigation}
            openedPage={props.route.name}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="recordDetail"
        options={{
          title: "Record Detail",
          animation: "none",
          headerShadowVisible: false,
        }}
      >
        {(props: RoutePropsType) => (
          <RecordDetailScreen
            {...props}
            title={props.route.name}
            navigation={props.navigation}
            openedPage={props.route.name}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="video"
        options={{
          title: "",
          animation: "none",
          headerTransparent: true,
        }}
      >
        {(props: RoutePropsType) => (
          <VideoScreen
            {...props}
            title={props.route.name}
            navigation={props.navigation}
            openedPage={props.route.name}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="analytics"
        options={{
          title: "Analytics",
          headerLeft: () => <></>,
          animation: "none",
          headerShadowVisible: false,
        }}
      >
        {(props: RoutePropsType) => (
          <AnalyticscScreen
            {...props}
            title={props.route.name}
            navigation={props.navigation}
            openedPage={props.route.name}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="profile"
        options={{
          title: "",
          headerLeft: () => <></>,
          animation: "none",
          headerShadowVisible: false,

        }}
      >
        {(props: RoutePropsType) => (
          <EditProfile
            {...props}
            title={props.route.name}
            navigation={props.navigation}
            openedPage={props.route.name}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
