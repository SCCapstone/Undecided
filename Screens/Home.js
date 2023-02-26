import React from "react";
import { db } from "../firebase";
import * as AuthSession from "expo-auth-session";
import { doc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View, StyleSheet,Button,Pressable } from "react-native";
import { COLORS } from '../constants/colors.js'
import { createStackNavigator } from "@react-navigation/stack";


export default function Home({ navigation }) {

  const [name, setName] = React.useState("");
  const [type, setType] = React.useState("Email");

  const HomeStack = createStackNavigator();
  React.useEffect(() => {
    getDb();
  }, []);

  const getDb = async () => {
    let uid = await AsyncStorage.getItem("uid");
    console.log("UUID: " + uid)
    let user = await getDoc(doc(db, "users", uid));
    console.log("User: " + user)
    setType(user.data().signinType || "Email");
    if (user.data().signinType == "Email") {
      setName(`${user.data()?.firstName} ${user.data()?.lastName}`);
    } else {
      setName(user.data().name);
    }
  };

  const log = async () => {
    if (type == "Email") {
      AsyncStorage.removeItem("uid");
      navigation.navigate('Auth');
    } else {
      AsyncStorage.removeItem("uid");
      let token = await AsyncStorage.getItem("token");
      AuthSession.revokeAsync(
        { token },
        { revocationEndpoint: "https://oauth2.googleapis.com/revoke" }
      );
      navigation.navigate('Auth');
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.Home}>Home</Text>
        <Text style={styles.welcomingText}>Welcome {name}!</Text>
        <View style={styles.space} /> 
        <Pressable style={styles.button} onPress={log}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: COLORS.green,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  Home: {
    color: "#464838",
    fontSize: 22,
    textAlign:  "center",
    marginTop: 50,
  },
  welcomingText: {
    color: "#464838",
    fontSize: 22,
    marginHorizontal: 50,
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  space: {
    width: 20,
    height: 20,
  },
  button: {
    backgroundColor: COLORS.wood,
    width: 100,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    shadowColor: "black",
  },
  buttonText: {
    fontSize: 15,
  }
});