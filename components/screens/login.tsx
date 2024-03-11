import React from 'react';
import {View, Text, Image, ScrollView, TextInput, StyleSheet} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Login() {
    return (
        <SafeAreaProvider>
            <view>
                <text>
                    Login
                </text>
            </view>
        </SafeAreaProvider>
    );
}