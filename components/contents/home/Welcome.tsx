import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Avatar from '../../ui/Avatar';
import { welcomeStyles } from '../../../styles/welcome';
import { WelcomeProps } from '../../../types/home';

const Welcome: React.FC<WelcomeProps> = ({ user }) => {
  return (
    <>
      <View
        style={{
          gap: 10,
        }}
      >
        <Avatar id={user.id} src={user.profile.photoUrl ? user.profile.photoUrl : ""} alt={`${user.name}-profile`} />
        <Text style={welcomeStyles.text}>{`Hello ${user.name}!`} &#128075;</Text>
      </View>
    </>
  );
};

export default Welcome;
