import React from "react";
import { auth } from "../firebase";
import { TextInput, Button } from "react-native-paper";
import { StyleSheet, View, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation: { navigate } }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [visible, setVisible] = React.useState(false);

  const LoginHandle = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        Alert.alert("Succes", "Logedin succesfully", [
          {
            text: "Ok",
            onPress: async () => {
              await AsyncStorage.setItem("uid", user.user.uid);
              navigate("Home");
            },
          },
        ]);
      })
      .catch(({ message }) => Alert.alert("Oops!", message, [{ text: "Ok" }]));
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={email}
        label="email"
        mode="outlined"
        style={styles.inpt}
        onChangeText={setEmail}
      />
      <TextInput
        secureTextEntry={visible}
        mode="outlined"
        value={password}
        label="password"
        style={styles.inpt}
        onChangeText={setPassword}
        right={
          <TextInput.Icon icon={visible ? "eye-off": "eye"} onPress={() => setVisible(!visible)} />
        }
      />
      <Button
        mode="contained"
        style={styles.login}
        onPress={LoginHandle}
        labelStyle={styles.label}
      >
        Login
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  inpt: {
    width: "85%",
    fontSize: 18,
    marginTop: 15,
    borderRadius: 120,
    backgroundColor: "white",
  },
  login: {
    width: 200,
    marginTop: 150,
    borderRadius: 100,
    paddingVertical: 3,
    backgroundColor: "black",
  },
  label: {
    fontSize: 20,
    color: "white",
  },
});