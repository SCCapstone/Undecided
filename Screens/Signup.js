import React from "react";
import { auth, db } from "../firebase";
import { TextInput, Button } from "react-native-paper";
import { StyleSheet, View, Alert } from "react-native";
import { PaperSelect } from "react-native-paper-select";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database";

const database = getDatabase();
import { COLORS } from '../constants/colors.js'

export default function Signup({ navigation: { navigate } }) {
  const [firstName, setFirstName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [age, setAge] = React.useState("");

  const [activity, setActivity] = React.useState({
    value: "",
    selectedList: [],
  });

  const [goal, setGoal] = React.useState({
    value: "",
    selectedList: [],
  });

  const [dietary, setDietary] = React.useState({
    value: "",
    selectedList: [],
  });

  const activities = [
    { _id: "SEDENTARY", value: "Sedentary" },
    { _id: "LIGHT", value: "Light" },
    { _id: "MODERATE", value: "Moderate" },
    { _id: "HIGH", value: "High" },
  ];

  const goals = [
    { _id: "CALORIES", value: "Calories" },
    { _id: "WEIGHT_GAIN", value: "Weight Gain" },
    { _id: "WEIGHT_LOSS", value: "Weight Loss" },
    { _id: "MUSCLE_GAIN", value: "Muscle Gain" },
  ];

  const dietaryRestriction = [
    { _id: "LACTOSE_INTOLERANCE", value: "Lactose Intolerance" },
    { _id: "GLUTEN_INTOLERANCE", value: "Gluten Intolerance" },
    { _id: "VEGETARIAN", value: "Vegetarian" },
    { _id: "KETO", value: "Keto" },
    { _id: "DIABETES", value: "Diabetes" },
    { _id: "DIARY_FREE", value: "Dairy-Free" },
    { _id: "LOW_CARB", value: "Low Carb" },
  ];

  const SignupHandle = async () => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      height !== "" &&
      weight !== "" &&
      activity.value !== "" &&
      goal.value !== "" &&
      dietary.value !== "" &&
      age !== "" &&
      phone !== "" &&
      email !== "" &&
      password !== ""
    ) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (user) => {
          console.log('setdoc')
          await setDoc(doc(db, "users", user.user.uid), {
            signinType: "Email",
            firstName,
            lastName,
            height,
            weight,
            activity: activity.value,
            goal: goal.value,
            dietary: dietary.value,
            age,
            phone,
            email,
            password,
          })
          console.log("successfully set doc")
          await AsyncStorage.setItem("uid", user.user.uid);
          console.log("successfully set uid")
          navigate("Home");
        })
        .catch((error) =>
          Alert.alert("Oops!", error.message, [{ text: "Ok" }])
        );
    } else alert("please fill all the fields");
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Input val={firstName} label = "First Name" change={setFirstName} />
        <Input val={lastName} label = "Last Name" change={setLastName} />
      </View>
      <View style={styles.row}>
        <Input val={height} label = "Height (cm)" change={setHeight} />
        <Input val={weight} label = "Weight (kg)" change={setWeight} />
      </View>
      <View style={styles.row}>
        <Input val={age} label = "Age" change={setAge} />
        <Input val={phone} label = "Phone #" change={setPhone} />
      </View>
      <View style={styles.row}>
        <PaperSelect
          textInputBackgroundColor={COLORS.wood}
          label = "Activity Level"
          value={activity.value}
          onSelection={({ text, selectedList }) => {
            setActivity({ value: text, selectedList });
          }}
          outlineColor="gray"
          arrayList={activities}
          textInputMode="outlined"
          selectedArrayList={activity.selectedList}
          textInputStyle={{ ...styles.inpt, width: "100%" }}
          containerStyle={{ width: "48%", marginBottom: 0, marginRight: 15 }}
        />
        <PaperSelect
          textInputBackgroundColor={COLORS.wood}
          label = "Goal"
          value={goal.value}
          onSelection={({ text, selectedList }) => {
            setGoal({ value: text, selectedList });
          }}
          arrayList={goals}
          outlineColor="gray"
          textInputMode="outlined"
          selectedArrayList={goal.selectedList}
          containerStyle={{ width: "48%", marginBottom: 0 }}
          textInputStyle={{ ...styles.inpt, width: "100%" }}
        />
        </View>
      <View style={styles.row}>
        <PaperSelect
          label = "Dietary Restrictions"
          value={dietary.value}
          onSelection={({ text, selectedList }) => {
            setDietary((prev) => ({
              ...prev,
              value: text,
              selectedList: [...selectedList],
            }));
          }}
          arrayList={dietaryRestriction}
          outlineColor="gray"
          textInputMode="outlined"
          multiEnable={true}
          selectedArrayList={dietary.selectedList}
          containerStyle={{ width: "100%", marginBottom: 0 }}
          textInputStyle={{ ...styles.inpt, width: "100%" }}
        />
      </View>
      
      <Input val={email} label = "Email" full change={setEmail} />
      <Input val={password} label = "Password" full psw change={setPassword} />
      <Button
        mode="contained"
        style={styles.login}
        onPress={SignupHandle}
        labelStyle={styles.label}
      >
        Signup
      </Button>
    </View>
  );
}

const Input = ({ val, change, label, psw, full }) => (
  <TextInput
    value={val}
    label={label}
    mode="outlined"
    onChangeText={change}
    secureTextEntry={psw ? true : false}
    right={psw ? <TextInput.Icon icon="eye" /> : null}
    style={full ? [styles.inpt, styles.fullWidth] : styles.inpt}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    width: "90%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inpt: {
    width: "48%",
    fontSize: 18,
    marginTop: 15,
    borderRadius: 120,
    backgroundColor: COLORS.wood,
  },
  fullWidth: {
    width: "90%",
  },
  login: {
    width: 200,
    marginTop: 30,
    borderRadius: 100,
    paddingVertical: 3,
    backgroundColor: "black",
  },
});
