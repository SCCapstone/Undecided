import React from "react";
import { auth, db } from "../firebase";
import { TextInput, Button } from "react-native-paper";
import { StyleSheet, View, Alert } from "react-native";
import { PaperSelect } from "react-native-paper-select";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const activities = [
    { _id: "1", value: "1" },
    { _id: "2", value: "2" },
    { _id: "3", value: "3" },
    { _id: "4", value: "4" },
    { _id: "5", value: "5" },
  ];

  const goals = [
    { _id: "1", value: "Calories" },
    { _id: "2", value: "Weight Gain" },
    { _id: "3", value: "Weight Loss" },
    { _id: "4", value: "Muscle Gain" },
  ];

  const SignupHandle = () => {
    if (
      firstName !== "" ||
      lastName !== "" ||
      height !== "" ||
      weight !== "" ||
      activity !== "" ||
      goal !== "" ||
      age !== "" ||
      phone !== "" ||
      email !== "" ||
      password !== ""
    ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          setDoc(doc(db, "users", user.user.uid), {
            signinType: "Email",
            firstName,
            lastName,
            height,
            weight,
            activity,
            goal,
            age,
            phone,
            email,
            password,
          })
            .then(() => {
              Alert.alert(
                "Congrats",
                "Your account has been created succesfully",
                [
                  {
                    text: "Ok",
                    onPress: async () => {
                      await AsyncStorage.setItem("uid", user.user.uid);
                      navigate("Home");
                    },
                  },
                ]
              );
            })
            .catch((error) => {
              Alert.alert("Oops!", error.message, [{ text: "Ok" }]);
            });
        })
        .catch((error) =>
          Alert.alert("Oops!", error.message, [{ text: "Ok" }])
        );
    } else alert("please fill all the fields");
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Input val={firstName} label = "first name" change={setFirstName} />
        <Input val={lastName} label = "last name" change={setLastName} />
      </View>
      <View style={styles.row}>
        <Input val={height} label = "height (in cm)" change={setHeight} />
        <Input val={weight} label = "weight  (in kg)" change={setWeight} />
      </View>
      <View style={styles.row}>
        <PaperSelect
          label = "activity level"
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
          label = "goal"
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
        <Input val={age} label = "age" change={setAge} />
        <Input val={phone} label = "phone no." change={setPhone} />
      </View>
      <Input val={email} label = "email" full change={setEmail} />
      <Input val={password} label = "password" full psw change={setPassword} />
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
    backgroundColor: "white",
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