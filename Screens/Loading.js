import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";

const Loading = ({ navigation: { navigate } }) => {
    useEffect(() => {
      getUser();
    });
  
    const getUser = async () => {
      let uid = await AsyncStorage.getItem("uid");
      if (uid !== null) navigate('Home');
      else navigate('Auth');
    };
  
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={70} />
      </View>
    );
  };

export default Loading