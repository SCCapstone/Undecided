import React, {useContext} from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDiary } from "../util";
import { DiaryContext } from '../Contexts/DiaryContext';
import { Text, View, StyleSheet,Button,Pressable } from "react-native";
import { COLORS } from '../constants/colors.js'
import { useFocusEffect} from '@react-navigation/native';
import CalorieTracker from "../components/CalorieGoal";




export default function Home({ navigation }) {
  let uid
  let cal
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState("Email");
  const [calorieGoal, setCalorieGoal] = React.useState(2000);
  const [caloriesConsumed, setCaloriesConsumed] = React.useState("0");
  const [goal, setGoal] = React.useState("");
  const {diary, setDiary} = useContext(DiaryContext)

  useFocusEffect(React.useCallback(() => {
    loadDiary();
  }, []));

 const loadDiary = async () =>{
  await getDb()
  let newDiary = await getDiary()
  setCaloriesConsumed(newDiary.getEntry(new Date().toDateString()).getCalorieTotal())
  console.log(calorieGoal)
  newDiary.calorieGoal = cal

  setDiary(newDiary);
 }
  const getDb = async () => {
    uid = await AsyncStorage.getItem("uid");
    try{
      let user = await getDoc(doc(db, "users", uid));
      setType(user.data().signinType || "Email");
      if (user.data().signinType == "Email") {
        setName(`${user.data()?.firstName} ${user.data()?.lastName}`);
        setCalorieGoal(`${user.data()?.calorieGoal}`);
        setGoal(`${user.data()?.goal}`);
        cal = `${user.data()?.calorieGoal}`
      } else {
        setName(user.data().name);
      }
    }catch(e){
      setCalorieGoal(2000)
      console.log(e)
    }
  
  };
  const nav = (name) =>{
    navigation.reset({
      index: 0,
      routes: [{ name: name }],
    });
  }
  const log = async () => {
    if (type == "Email") {
      await AsyncStorage.removeItem("uid");
      nav("Auth")
    } else {
      AsyncStorage.removeItem("uid");
      let token = await AsyncStorage.getItem("token");
      AuthSession.revokeAsync(
        { token },
        { revocationEndpoint: "https://oauth2.googleapis.com/revoke" }
      );
      nav("Auth")

    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.welcomingText}>Welcome {name}!</Text>
        <CalorieTracker calorieGoal={calorieGoal} caloriesRemaining={calorieGoal - caloriesConsumed} goal={goal} />
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
  }
});
