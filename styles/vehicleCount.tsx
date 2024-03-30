import { StyleSheet, Dimensions } from "react-native";

const {width} = Dimensions.get("window")
const height = width * 0.6

export const vehicleCountStyles = StyleSheet.create({
    icon: {
        marginBottom: 13
    },
    card: {
      borderRadius: 20,
      paddingVertical: 45,
      paddingHorizontal: 15,
      width: 140,
      height: 180,
      marginVertical: 10,
      marginLeft: 20,
      marginRight: 20,
      justifyContent: "center",
      alignItems: "center"
    },
    elevation: {
      elevation: 20,
      shadowColor: '#52006A',
    },
    text: {
        fontSize: 20,
        marginTop: 20,
        marginBottom: 10
    },
    contentText: {
        fontSize: 18,
        fontWeight: "bold",
    }
  })