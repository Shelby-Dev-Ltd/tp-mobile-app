import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { 
  StyleSheet,
  SafeAreaView,
  Text,
  View 
} from 'react-native';

import { 
  NavigationContainer, 
} from '@react-navigation/native';
import { Onboarding } from './components/screens/Onboarding';
import Register from './components/screens/register';
import Login from './components/screens/Login';
import Routes from './routes/routes';
import Signup from './components/screens/signup';
import BaseScreen from './components/screens/base';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Routes/>
      </NavigationContainer>
    </SafeAreaView>     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
