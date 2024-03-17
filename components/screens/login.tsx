import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";
import FormInput from "../ui/formInput";
import LoginButton from "../ui/loginButton";
import RegisterButton from "../ui/registerButton";
import ForgotPassButton from "../ui/forgotPassButton";
import { RootStack } from "../../types/rootstack";

export default function Login({ navigation }: RootStack) {
  // const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Image
          style={styles.image}
          source={require("../../assets/auth/login.png")}
        />
      </View>

      <View>
        <Text
          style={{
            color: "#333333",
            fontSize: 34,
            fontWeight: "bold",
            textAlign: "left",
            marginLeft: 25,
            marginTop: 230,
          }}
        >
          Login
        </Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.text}>Email Adress</Text>

        <FormInput
          placeholder="Enter your email"
          iconName="user"
          secureTextEntry={false}
        />

        <Text style={styles.text}>Password</Text>

        <FormInput
          placeholder="Enter your password"
          iconName="password"
          secureTextEntry={true}
        />

        <LoginButton
          textBtn="Login"
          onPress={() => {
            navigation.navigate("base");
          }}
        />

        <ForgotPassButton
          textBtn="Forgot Your Password?"
          onPress={() => navigation.navigate("Forgot Password")}
        />

        <RegisterButton
          text="Don't have any account?"
          textBtn="Register"
          onPress={() => navigation.navigate("register")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  containerHeader: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: 150,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 100,
    paddingBottom: 30,
  },

  image: {
    width: 200,
    height: 250,
  },

  text: {
    paddingBottom: 10,
    color: "#333333",
    fontSize: 13,
    // fontWeight: 'bold',
    textAlign: "left",
  },

  form: {
    marginLeft: 25,
    marginRight: 25,
    width: "100%",
    marginVertical: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
});
