import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/screens/home';
import HistoryScreen from './components/screens/history';
import { screenProps } from './types/screenprops';
import RecordScreen from './components/screens/record';
import AnalyticscScreen from './components/screens/analytics';
import SettingsScreen from './components/screens/settings';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          options={{
            title: 'Home',
            headerLeft: () => null,
          }}
        >
          {(props: any) => <HomeScreen {...props} title={props.route.name} navigation={props.navigation} />}
        </Stack.Screen>
        <Stack.Screen
          name="history"
          options={{
            title: 'History',
            headerLeft: () => <></>,
          }}
        >
          {(props: any) => <HistoryScreen {...props} title={props.route.name} navigation={props.navigation} />}
        </Stack.Screen>
        <Stack.Screen
          name="record"
          options={{
            title: 'Record',
            headerLeft: () => <></>,
          }}
        >
          {(props: any) => <RecordScreen {...props} title={props.route.name} navigation={props.navigation} />}
        </Stack.Screen>
        <Stack.Screen
          name="analytics"
          options={{
            title: 'Analytics',
            headerLeft: () => <></>,
          }}
        >
          {(props: any) => <AnalyticscScreen {...props} title={props.route.name} navigation={props.navigation} />}
        </Stack.Screen>
        <Stack.Screen
          name="settings"
          options={{
            title: 'Settings',
            headerLeft: () => <></>,
          }}
        >
          {(props: any) => <SettingsScreen {...props} title={props.route.name} navigation={props.navigation} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
