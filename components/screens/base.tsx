import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './home';
import HistoryScreen from './history';
import { screenProps } from "../../types/screenprops";
import RecordScreen from './record';
import AnalyticscScreen from './analytics';
import SettingsScreen from './settings';

const Stack = createNativeStackNavigator();

export default function BaseScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          options={{
            title: 'Home',
            headerLeft: () => <></>,
            animation: 'none',
          }}
        >
          {(props: any) => <HomeScreen {...props} title={props.route.name} navigation={props.navigation} openedPage={props.route.name} />}
        </Stack.Screen>
        <Stack.Screen
          name="history"
          options={{
            title: 'History',
            headerLeft: () => <></>,
            animation: 'none',
          }}
        >
          {(props: any) => <HistoryScreen {...props} title={props.route.name} navigation={props.navigation} openedPage={props.route.name} />}
        </Stack.Screen>
        <Stack.Screen
          name="record"
          options={{
            title: 'Record',
            headerLeft: () => <></>,
            animation: 'none',
          }}
        >
          {(props: any) => <RecordScreen {...props} title={props.route.name} navigation={props.navigation} openedPage={props.route.name} />}
        </Stack.Screen>
        <Stack.Screen
          name="analytics"
          options={{
            title: 'Analytics',
            headerLeft: () => <></>,
            animation: 'none',
          }}
        >
          {(props: any) => <AnalyticscScreen {...props} title={props.route.name} navigation={props.navigation} openedPage={props.route.name} />}
        </Stack.Screen>
        <Stack.Screen
          name="settings"
          options={{
            title: 'Settings',
            headerLeft: () => <></>,
            animation: 'none',
          }}
        >
          {(props: any) => <SettingsScreen {...props} title={props.route.name} navigation={props.navigation} openedPage={props.route.name} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}