import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window")
const height = width * 0.6

export const bannerStyles = StyleSheet.create({
    container: {
        marginTop: 20,
        width,
        height
    },
    scroll: {
        width,
        height,
    },
    image: {
        width: width - 20,
        height,
        resizeMode: "cover",
        borderRadius: 40,
    },
    pagination: {
        flexDirection: "row",
        position: "absolute",
        bottom: 0,
        alignSelf: "center"
    },
    pagingText: {
        fontSize: width / 30,
        color: "#888",
        margin: 3
    },
    pagingActiveText: {
        fontSize: width / 30,
        color: "#fff",
        margin: 3
    }

})