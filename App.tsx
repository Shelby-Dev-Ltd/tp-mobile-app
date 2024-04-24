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
import RecordCreation from './components/contents/video/RecordCreation';
import { GooglePlaceDetail } from 'react-native-google-places-autocomplete';

const Stack = createStackNavigator();

const firebaseApp = app; // to trigger firebase initialization 

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Routes />
          {/* <RecordCreation onSubmit={function (location: string): void {
            throw new Error('Function not implemented.');
          } }/> */}
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
