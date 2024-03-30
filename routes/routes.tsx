import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Onboarding } from "../components/screens/Onboarding";
import BaseScreen from "../components/screens/base";
import Signup from "../components/screens/signup";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen
        name="onboarding"
        component={Onboarding}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="base"
        component={BaseScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
