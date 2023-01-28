
import React, { useEffect } from "react";
import { Provider } from "react-native-paper";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Auth from "./Screens/Auth";
import Home from "./Screens/Home";
import AuthAuth from "./Screens/AutoAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const options = { headerShown: false };

export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Loading">
          <Stack.Screen name="Welcome" component={AuthAuth} options={options} />
          <Stack.Screen name="Loading" component={Loading} options={options} />
          <Stack.Screen
            name="auth"
            component={Auth}
            options={{ title: "Life React" }}
          />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const Loading = ({ navigation: { navigate } }) => {
  useEffect(() => {
    getUser();
  });

  const getUser = async () => {
    let uid = await AsyncStorage.getItem("uid");
    if (uid !== null) navigate("Home");
    else navigate("Welcome");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={70} />
    </View>
  );
};

