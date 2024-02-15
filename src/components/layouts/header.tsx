import React from 'react'
import { Text, TextStyle, View, ViewStyle, StyleSheet } from "react-native"

// type Props = {
//     title: string
//     containerStyle?: ViewStyle
//     titleStyle?: TextStyle
//     showBorderBottom?: boolean
//   }

const Header = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Header</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'skyblue',
        height: 60,
    },
    text: {
        fontFamily: 'Roboto-Medium',
        fontSize: 20,
    }
});

export default Header;