import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Avatar from '../ui/Avatar';
import { welcomeStyles } from '../../styles/welcome';

const Welcome = () => {
  return (
    <>
      <View style={welcomeStyles.avatarContainer}>
        <Avatar id={undefined} src={undefined} alt={undefined} />
      </View>
      <Text style={welcomeStyles.text}>Hello John! &#128075;</Text>
    </>
  );
};

export default Welcome;
