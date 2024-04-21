import React from "react";
import { TouchableOpacity, Text, Image, StyleSheet, View } from "react-native";

interface googleButtonProps {
  textBtn: string;
  onPress: () => void;
}

const GoogleButton: React.FC<googleButtonProps> = ({ textBtn, onPress }) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/auth/google.png")} // Ganti dengan path ke gambar logo Google Anda
          resizeMode="contain"
        />
        <Text style={styles.text}>{textBtn}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: "100%",
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2F80ED",
    padding: 10,
    borderRadius: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    marginLeft: -80, // Jarak antara gambar dan teks
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginLeft: 20,
  },
});

export default GoogleButton;
