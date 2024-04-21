import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;

export const globalStyles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    menuBarStyle: {
        minWidth: windowWidth + 10,
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    content: {
        flex: 1,
        paddingHorizontal: 10,
        paddingBottom: 60,
        paddingTop: 30,
    },
    box: {
        width: windowWidth / 5,
        height: 60,
        overflow: 'hidden',
    },
});