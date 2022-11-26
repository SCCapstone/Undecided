import React from "react";
import { db } from "../firebase";
import * as AuthSession from "expo-auth-session";
import { doc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View, StyleSheet, ImageBackground, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function Home({ navigation: { navigate } }) {
  const navigation = useNavigation();
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
      <ImageBackground style={styles.bgImage} source={require("../58c5cc.png")}>
        <Text style={styles.welcomingText}>Welcome {name}!</Text>
        <Button title='diary screen' onPress={() => navigation.navigate('Diary')}/>
        <Button title='food search screen' onPress={() => navigation.navigate('FoodSearch')}/>
        <Button title="Logout" onPress={log} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(254,123,95,255)",
    alignItems: "center",
    justifyContent: "center",
  },
  welcomingText: {
    color: "white",
    fontSize: 22,
    marginHorizontal: 50,
    marginTop: 60,
    textAlign: "center",
  },
  bgImage: {
    width: "100%",
    height: "100%",
  },
});