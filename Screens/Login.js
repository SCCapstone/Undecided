import React from "react";
import { auth } from "../firebase";
import { TextInput, Button } from "react-native-paper";
import { StyleSheet, View, Alert, Dimensions } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../constants/colors"
import { ScrollView } from "react-native-gesture-handler";

export default function Login({ navigation: { navigate } }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [visible, setVisible] = React.useState(false);

  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  const LoginHandle = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        Alert.alert("Success", "Logged in successfully", [
          {
            text: "Ok",
            onPress: async () => {
              await AsyncStorage.setItem("uid", user.user.uid);
              console.log(user.user.uid);
              navigate("Home");
            },
          },
        ]);
      })
      .catch(({ message }) => Alert.alert("Oops!", message, [{ text: "Ok" }]));
  };

  return (
    <><ScrollView contentContainerStyle={{ height: 0.6 * screenHeight, width: screenWidth }}>
      <View style={styles.container}>
        <TextInput
          value={email}
          label="Email"
          mode="outlined"
          style={styles.inpt}
          onChangeText={setEmail} />
        <TextInput
          secureTextEntry={visible}
          mode="outlined"
          value={password}
          label="Password"
          style={styles.inpt}
          onChangeText={setPassword}
          right={<TextInput.Icon icon={visible ? "eye-off" : "eye"} onPress={() => setVisible(!visible)} />} />
      </View>
    </ScrollView>
      <View>
        <Button
          mode="contained"
          style={styles.login}
          onPress={LoginHandle}
          labelStyle={styles.label}
        >
          Login
        </Button>
      </View></>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  inpt: {
    width: "85%",
    fontSize: 18,
    marginTop: 15,
    borderRadius: 120,
    backgroundColor: COLORS.wood,
  },
  login: {
    width: 200,
    marginTop: 15,
    borderRadius: 100,
    paddingVertical: 3,
    backgroundColor: "black",
    marginBottom: 50,
  },
  label: {
    fontSize: 20,
    color: "white",
  },
});