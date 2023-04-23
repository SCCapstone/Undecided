import React, {useContext} from "react";
import { db } from "../firebase";
import * as AuthSession from "expo-auth-session";
import { doc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDiary } from "../util";
import { DiaryContext } from '../Contexts/DiaryContext';
import { Text, View, StyleSheet,Button,Pressable } from "react-native";
import { COLORS } from '../constants/colors.js'
import { createStackNavigator } from "@react-navigation/stack";
import { StackActions, useFocusEffect} from '@react-navigation/native';
import CalorieTracker from "../components/CalorieGoal";




export default function Home({ navigation }) {

  const [name, setName] = React.useState("");
  const [type, setType] = React.useState("Email");
  const [calorieGoal, setCalorieGoal] = React.useState("2000");
  const [caloriesConsumed, setCaloriesConsumed] = React.useState("0");
  const [goal, setGoal] = React.useState("");
  const [currentWeight, setWeight] = React.useState("0")
  const {diary, setDiary} = useContext(DiaryContext)
  useFocusEffect(React.useCallback(() => {
    getDb();
  }, []));

  const getDb = async () => {
    let uid = await AsyncStorage.getItem("uid");
    console.log("UUID: " + uid)
    let user = await getDoc(doc(db, "users", uid));
    console.log("User: " + user)
    let newDiary = await getDiary()
    
    setType(user.data().signinType || "Email");
    if (user.data().signinType == "Email") {
      setName(`${user.data()?.firstName} ${user.data()?.lastName}`);
      setCalorieGoal(`${user.data()?.calorieGoal}`);
      setWeight(`${user.data()?.weight}`);
      setGoal(`${user.data()?.goal}`);
      newDiary.calorieGoal = `${user.data()?.calorieGoal}`
      //TODO: remove log
      console.log("set user name in if")
    } else {
      setName(user.data().name);
      //TODO: remove log
      console.log("set user name in else")
    }
    setDiary(newDiary);
       //TODO: remove log
    setCaloriesConsumed(newDiary.getEntry(new Date().toDateString()).getCalorieTotal())
  };

  const log = async () => {
    if (type == "Email") {
      await AsyncStorage.removeItem("uid");
      navigation.dispatch(StackActions.pop())
      navigation.navigate("Auth")
    } else {
      AsyncStorage.removeItem("uid");
      let token = await AsyncStorage.getItem("token");
      AuthSession.revokeAsync(
        { token },
        { revocationEndpoint: "https://oauth2.googleapis.com/revoke" }
      );
      navigation.dispatch(StackActions.pop())

    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.Home}>Home</Text>
        <Text style={styles.welcomingText}>Welcome {name}!</Text>
        <CalorieTracker calorieGoal={calorieGoal} caloriesRemaining={calorieGoal - caloriesConsumed} goal={goal} currentWeight={currentWeight}/>
        <View style={styles.space} />
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