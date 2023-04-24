/**
 * Login screen component
 * Allows the user to login using email and password
 * Uses Firebase authentication for user verfication AsyncStorage to store the user's UID after logging in
 * Uses React Native Paper Library and the StyleSheet API
 */
import React from "react";
import { auth } from "../firebase";
import { TextInput, Button } from "react-native-paper";
import { StyleSheet, View, Alert, Dimensions } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../constants/colors"
import { ScrollView } from "react-native-gesture-handler";

// Declaring and exporting the Login function
export default function Login({ navigation }) {

  // Define initialize the state variables
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [visible, setVisible] = React.useState(false);

  // Find the screen dimensions
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  // A function to navigate to another screen
  const nav = (name) =>{
    navigation.reset({
      index: 0,
      routes: [{ name: name }],
    });
  }

  // Function to handle Login
  const LoginHandle = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        Alert.alert("Success", "Logged in successfully", [
          {
            text: "Ok",
            onPress: async () => {
              await AsyncStorage.setItem("uid", user.user.uid);
              console.log(user.user.uid);
              nav("Home");
            },
          },
        ]);
      })
      .catch(({ message }) => Alert.alert("Oops!", message, [{ text: "Ok" }]));
  };
  
  // Rendering Login component
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
        <Button
          mode="contained"
          labelStyle={styles.forgotPassLabel}
          style={styles.login}
          onPress={() => navigation.navigate("RecoverPassword")}>
          Forgot Password?
        </Button>
      </View></>
  );
}

// Defining styles using StyleSheet
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
    marginTop: 10,
    borderRadius: 100,
    paddingVertical: 3,
    backgroundColor: "black",
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    color: "white",
  },
  forgotPassLabel: {
    fontSize: 12,
    color: "white",
  },
});