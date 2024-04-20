import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./home";
import RecordScreen from "./record";
import { screenProps } from "../../types/screenprops";
import VideoScreen from "./video";
import AnalyticscScreen from "./analytics";
import EditProfile from "./profile";

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
        {(props: any) => (
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
        {(props: any) => (
          <RecordScreen
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
        {(props: any) => (
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
        {(props: any) => (
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
        {(props: any) => (
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
