import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import { RootStack } from "../../types/rootstack";
import GoogleButton from "../ui/googleButton";
import { useAuth } from "../../contexts/AuthContext";

export default function Signup({ navigation }: RootStack) {

  const { login, isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    if (isLoggedIn) navigation.navigate('base')
  }, [isLoggedIn])

  const DoLogin = async () => {
    try {
      const loginRes = await login();
      if (loginRes === 'LOGGED') {
        navigation.navigate('base');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Image
          style={styles.image}
          source={require("../../assets/auth/register.png")}
        />
      </View>

      <View>
        <Text
          style={{
            color: "#333333",
            fontSize: 25,
            fontWeight: "bold",
            textAlign: "left",
            marginLeft: 25,
            marginTop: 230,
          }}
        >
          Get started
        </Text>

        <Text
          style={{
            color: "#333333",
            fontSize: 25,
            fontWeight: "bold",
            textAlign: "left",
            marginLeft: 25,
          }}
        >
          with TrafficPulse.
        </Text>

        <Text
          style={{
            color: "#737373",
            fontSize: 12,
            textAlign: "left",
            marginLeft: 25,
            marginRight: 25,
            marginTop: 5,
          }}
        >
          By proceeding you agree to our Terms of Use and confirm
          you have read our Privacy and Cookie Statement.
        </Text>
      </View>

      <View
        style={{
          marginLeft: 25,
          marginRight: 25,
          marginTop: 50,
          alignItems: 'center',
        }}>
        <GoogleButton
          textBtn="Continue with Google"
          onPress={!isLoading ? () => { setIsLoading(true); DoLogin() } : () => { }}
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

})
