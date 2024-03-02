import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    header: {
        height: 100,
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        // backgroundColor: '#2F80ED',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    menuBarStyle: {
        height: 60,
        flexDirection: 'row',
        backgroundColor: '#2F80ED',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    content: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
    },
    box: {
        backgroundColor: '#ffffff',
        width: 50,
        height: 50,
        borderRadius: 50,
        overflow: 'hidden',
    },
    bigBox: {
        backgroundColor: '#ffffff',
        width: 70,
        height: 70,
        marginTop: -20,
        padding: 0,
        borderRadius: 50,
        overflow: 'hidden',
    },
});