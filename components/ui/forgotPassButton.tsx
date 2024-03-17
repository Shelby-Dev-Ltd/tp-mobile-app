import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface forgotPassProps {
    textBtn: string;
    onPress: () => void;
}

const ForgotPassButton: React.FC<forgotPassProps> = ({ textBtn, onPress }) => {
    return (
        <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.text}>{textBtn}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btn: {
      width: '85%',
      height: 50,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    text: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#2F80ED',
      textAlign: 'center',
    },
  });
  
  export default ForgotPassButton;
  