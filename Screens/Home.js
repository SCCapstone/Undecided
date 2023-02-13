import React from "react";
import { db } from "../firebase";
import * as AuthSession from "expo-auth-session";
import { doc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View, StyleSheet,Button } from "react-native";


export default function Home({ navigation }) {

  const [name, setName] = React.useState("");
  const [type, setType] = React.useState("Email");

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
      navigate("Welcome");
    } else {
      AsyncStorage.removeItem("uid");
      let token = await AsyncStorage.getItem("token");
      AuthSession.revokeAsync(
        { token },
        { revocationEndpoint: "https://oauth2.googleapis.com/revoke" }
      );
      navigate("Welcome");
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.Home}>Home</Text>
        <Text style={styles.welcomingText}>Welcome {name}!</Text>
        <Button title='diary screen' onPress={() => navigation.navigate('Diary')}/>
        <Button title='User Settings' onPress={() => navigation.navigate('UserSettings')}/>
        <Button title="Logout" onPress={log} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#58c5cc",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  Home: {
    color: "white",
    fontSize: 22,
    textAlign:  "center",
    marginTop: 50,
  },
  welcomingText: {
    color: "white",
    fontSize: 22,
    marginHorizontal: 50,
    marginTop: 20,
    textAlign: "center",
  },
});