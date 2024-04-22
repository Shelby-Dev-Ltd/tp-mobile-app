import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./home";
import RecordScreen from "./record";
import VideoScreen from "./video";
import AnalyticscScreen from "./analytics";
import EditProfile from "./profile";
import { RoutePropsType } from "../../types/navigation";
import RecordDetailScreen from "./record-detail";

const Stack = createNativeStackNavigator();

export default function BaseScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        options={{
          title: "Home",
          headerLeft: () => <></>,
          animation: "none",
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
          title: "Profile",
          headerLeft: () => <></>,
          animation: "none",
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
