import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function Auth(props) {
  const [active, setActive] = React.useState("signin");

  return (
    <View style={styles.container}>
      <View style={styles.locator}>
        <TouchableOpacity
          activeOpacity={1}
          style={active == "signin" ? styles.activeOption : styles.option}
          onPress={() => setActive("signin")}
        >
          <Text style={{ color: "black" }}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={active == "signup" ? styles.activeOption : styles.option}
          onPress={() => setActive("signup")}
        >
          <Text style={{ color: "black" }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      {active == "signin" ? <Login {...props} /> : <Signup {...props} />}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#FE7B5F",
    justifyContent: "center",
  },
  locator: {
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  option: {
    zIndex: 3,
    width: 140,
    borderRadius: 100,
    paddingVertical: 12,
    position: "relative",
    alignItems: "center",
    marginHorizontal: -15,
    backgroundColor: "gray",
  },
  activeOption: {
    zIndex: 5,
    width: 140,
    borderRadius: 100,
    paddingVertical: 12,
    position: "relative",
    alignItems: "center",
    marginHorizontal: -17,
    backgroundColor: "#FBF174",
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
    marginTop: 30,
    borderRadius: 100,
    paddingVertical: 3,
    backgroundColor: "tomato",
  },
  label: {
    fontSize: 20,
    color: "white",
  },
});

//Colors:
// yellow: "#FBF174"
// orange: "#FE7B5F"
// white
// blue: "#58C5CC"
// green: "#89E894"