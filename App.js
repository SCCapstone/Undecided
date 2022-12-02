<<<<<<< HEAD
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
=======

import { Provider } from "react-native-paper";
import StackNavigator from './StackNavigator';
import { NavigationContainer } from "@react-navigation/native";
>>>>>>> 5178a7717863eca96c3925863eaa52776eab7ed1

export default function App() {
  return (
    <Provider>
      <NavigationContainer>
<<<<<<< HEAD
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
=======
        <StackNavigator/>
>>>>>>> 5178a7717863eca96c3925863eaa52776eab7ed1
      </NavigationContainer>
    </Provider>
  );
}

<<<<<<< HEAD
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
=======
export function getNutrientValue(foods , nutrientName) {
  let nutrientValue = 0
  let nutrient = foods.foodNutrients.find(item => item.nutrientName == nutrientName)
  if(nutrient !== undefined){
      nutrientValue = nutrient.value
  }
  return nutrientValue    
}
>>>>>>> 5178a7717863eca96c3925863eaa52776eab7ed1
