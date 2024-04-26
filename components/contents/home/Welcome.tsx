import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Avatar from '../../ui/Avatar';
import { welcomeStyles } from '../../../styles/welcome';
import { WelcomeProps } from '../../../types/home';

const Welcome: React.FC<WelcomeProps> = ({ user }) => {
  return (
    <>
      <View style={styles.container}>
        <Avatar id={user.id} src={user.profile.photoUrl ? user.profile.photoUrl : ""} alt={`${user.name}-profile`} />
        <Text style={[welcomeStyles.text, styles.text]}>{`Hello ${user.name}!`} &#128075;</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Arrange elements horizontally
    alignItems: 'center', // Vertically align avatar and text
    gap: 10, // Add spacing between avatar and text 
    marginTop: 30,
  },
  text: {
    // Apply additional text styles from welcomeStyles if needed
  },
});

export default Welcome;
