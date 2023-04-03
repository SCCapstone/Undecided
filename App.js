
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Auth from "./Screens/Auth";
import { DiaryContext } from "./Contexts/DiaryContext";
import { useState } from "react";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import HomeTabScreen from "./components/HomeStackScreen";
import Loading from "./Screens/Loading";
import Overview from './Screens/MacroNutrients'

//fix for "can't find variable: atob"
import {decode, encode} from 'base-64'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createNativeStackNavigator();

const options = { headerShown: false };

export default function App() {
  const [diary, setDiary] = useState([])
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
            <Stack.Screen name="NutritionalOverview" component={Overview} options={{ title: "" }}/>
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







