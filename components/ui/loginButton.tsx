import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface loginButtonProps {
    textBtn: string;
    onPress: () => void;
}

const LoginButton: React.FC<loginButtonProps> = ({ textBtn, onPress }) => {
    return (
        <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.text}>{textBtn}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btn: {
      width: '90%',
      height: 50,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2F80ED',
      padding: 10,
      borderRadius: 10,
    },
    text: {
      fontSize: 15,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
    },
  });
  
  export default LoginButton;
  