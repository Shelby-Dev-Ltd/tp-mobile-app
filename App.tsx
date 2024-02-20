import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/screens/home';
import HistoryScreen from './components/screens/history';
import { screenProps } from './types/screenprops';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {(props: any) => <HomeScreen {...props} title={props.route.name} navigation={props.navigation} />}
        </Stack.Screen>
        <Stack.Screen name="History" >
          {(props: any) => <HistoryScreen {...props} title={props.route.name} navigation={props.navigation} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
