import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface registerButtonProps {
    text: string;
    textBtn: string;
    onPress: ( ) => void;
}

const RegisterButton: React.FC<registerButtonProps> = ({ text, textBtn, onPress }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {text}
            </Text>
            <TouchableOpacity 
                style={styles.btn} 
                onPress={onPress}
            >
                <Text style={styles.textBtn}>
                    {textBtn}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    btn: {
        width: 'auto',
        paddingLeft: 5,
    },
    text: {
        marginLeft: -60,
        fontSize: 15,
        color: '#000',
        textAlign: 'center',
    },
    textBtn: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2F80ED',
        textAlign: 'center',
    },
});

export default RegisterButton;
