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
import { StackActions} from '@react-navigation/native';

export default function Home({ navigation }) {

  const [name, setName] = React.useState("");
  const [type, setType] = React.useState("Email");
  const {diary, setDiary} = useContext(DiaryContext)
  const [calorieGoal, setCalorieGoal] = React.useState("");
  React.useEffect(() => {
    getDb();
  }, []);

  const getDb = async () => {
    let uid = await AsyncStorage.getItem("uid");
    console.log("UUID: " + uid)
    let user = await getDoc(doc(db, "users", uid));
    console.log("User: " + user)
    let newDiary = await getDiary()
    console.log(newDiary);
    setDiary(newDiary);
    setType(user.data().signinType || "Email");
    if (user.data().signinType == "Email") {
      setName(`${user.data()?.firstName} ${user.data()?.lastName}`);
      setCalorieGoal(`${user.data()?.calorieGoal}`);
    } else {
      setName(user.data().name);
    }
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
      <View style={styles.headerContainer}>
        <Text style={styles.welcomingText}>Welcome {name}!</Text>
        <View style={styles.calorieGoalContainer}>
          <Text style={styles.calorieGoalText}>Calorie Goal</Text>
          <View style={styles.calorieGoalNumberContainer}>
            <Text style={styles.calorieGoalNumber}>{calorieGoal}</Text>
          </View>
        </View>
        <View style={styles.space}></View>
      </View>
      <View style={styles.logOutContainer}>
        <Pressable style={styles.logOutButton} onPress={log}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: COLORS.green,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
    width: "100%",
    height: "100%",
  },
  headerContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  Home: {
    color: "#464838",
    fontSize: 22,
    textAlign:  "center",
    //marginTop: 50,
  },
  welcomingText: {
    color: "#464838",
    fontSize: 22,
    marginHorizontal: 50,
    //marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  space: {
    width: 50,
    height: 20,
  },
  calorieGoalContainer: {
    backgroundColor: COLORS.wood,
    paddingVertical: 20,
    paddingHorizontal: 30,
    width: 220,
    marginTop: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  calorieGoalText: {
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: "bold",
    marginBottom: 10,
  },
  calorieGoalNumber: {
    fontSize: 50,
    color: COLORS.primary,
    fontWeight: "bold",
    textAlign: "center",
  },
  logOutButton: {
    backgroundColor: COLORS.wood,
    width: 100,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    shadowColor: "black",
    marginTop: 150,
  },
  logOutButtonText: {
    fontSize: 15,
  },
});