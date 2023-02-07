
import { Provider } from "react-native-paper";
import StackNavigator from './StackNavigator';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Auth from "./Screens/Auth";
import Home from "./Screens/Home";
import AuthAuth from "./Screens/AutoAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const options = { headerShown: false };
import { DiaryContext } from "./Contexts/DiaryContext";
import { useState } from "react";
import Diary from "./Classes/Diary"

export default function App() {
  const [diary, setDiary] = useState(new Diary())
  return (
    <Provider>
      <DiaryContext.Provider value={{diary, setDiary}}>
        <NavigationContainer>
          <StackNavigator/>
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