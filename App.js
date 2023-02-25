
import { Provider } from "react-native-paper";
import StackNavigator from './StackNavigator';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


//fix for "can't find variable: atob"
import {decode, encode} from 'base-64'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createNativeStackNavigator();

const options = { headerShown: false };
import { DiaryContext } from "./Contexts/DiaryContext";
import { useState } from "react";



export default function App() {
  const [diary, setDiary] = useState([])
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







