import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator, Text, Image, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global";

const Loading = ({ navigation}) => {
  useEffect(() => {
    getUser();
  });
  const nav = (name) =>{
    navigation.reset({
      index: 0,
      routes: [{ name: name }],
    });
  }
  const getUser = async () => {
    let uid = await AsyncStorage.getItem("uid");
    console.log("loading screen id:" + uid)
    if (uid !== null) nav('Home');
    else nav('Auth');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/Splash.png')} style={styles.logo} />
      <Text style={styles.title}>Loading</Text>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
};

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