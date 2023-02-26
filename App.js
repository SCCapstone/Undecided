
import { Provider } from "react-native-paper";
import StackNavigator from './StackNavigator';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserSettings from "./Screens/Settings/UserSettings";
import Auth from "./Screens/Auth";
import DiaryScreen from "./Screens/DiaryScreen";
import Home from "./Screens/Home";
import AuthAuth from "./Screens/AutoAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DiaryContext } from "./Contexts/DiaryContext";
import { useState } from "react";
import Diary from "./Classes/Diary"
import SettingStackScreen from "./components/SettingStackScreen";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import HomeTabScreen from "./components/HomeStackScreen";
import Loading from "./Screens/Loading";
//fix for "can't find variable: atob"
import {decode, encode} from 'base-64'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const options = { headerShown: false };

export default function App() {
  const [diary, setDiary] = useState(new Diary())
  return (
    <Provider>
      <DiaryContext.Provider value={{diary, setDiary}}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name = "Loading" component = {Loading} options = {options} />
            <Stack.Screen name = "Login" component = {Login} options = {options} />
            <Stack.Screen name = "Signup" component = {Signup} options = {options} />
            <Stack.Screen name = "Auth" component = {Auth} options = {options} />
            <Stack.Screen name = "Home" component = {HomeTabScreen} options = {options} />
          </Stack.Navigator>
        </NavigationContainer>
      </DiaryContext.Provider>
    </Provider>
  );
}

export function getNutrientValue(foods , nutrientName) {
  let nutrientValue = 0
  let nutrient = foods.foodNutrients.find(item => item.nutrientName == nutrientName)
  if(nutrient !== undefined){
      nutrientValue = nutrient.value
  }
  return nutrientValue    
}