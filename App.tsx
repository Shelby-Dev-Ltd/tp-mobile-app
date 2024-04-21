import { StatusBar } from 'expo-status-bar';
import React from 'react';

import {
  StyleSheet,
  SafeAreaView
} from 'react-native';

import {
  NavigationContainer,
} from '@react-navigation/native';
import Routes from './routes/routes';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './contexts/AuthContext';
import { app } from './config/firebase';

const Stack = createStackNavigator();

const firebaseApp = app; // to trigger firebase initialization 

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Routes />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
