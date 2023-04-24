/**
 * Loading screen to display when the app is launched
 */
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator, Text, Image, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global";

const Loading = ({ navigation}) => {
  useEffect(() => {
    getUser();
  });

  // A function to navigate to another screen
  const nav = (name) =>{
    navigation.reset({
      index: 0,
      routes: [{ name: name }],
    });
  }

  // Function to get the user ID from async storage and navigate to another screen
  const getUser = async () => {
    let uid = await AsyncStorage.getItem("uid");
    console.log("loading screen id:" + uid)
    if (uid !== null) nav('Home');
    else nav('Auth');
  };

  // Rendering Loading component
  return (
    <View style={styles.container}>
      <Image source={require('../assets/splash.png')} style={styles.logo} />
      <Text style={styles.title}>Loading</Text>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
};

// Defining styles using StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#F5FCFF'
  },
  logo: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Loading;