
import { Provider } from "react-native-paper";
import StackNavigator from './StackNavigator';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Food from './Classes/Food'
import Auth from "./Screens/Auth";
import Home from "./Screens/Home";
import AuthAuth from "./Screens/AutoAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

//fix for "can't find variable: atob"
import {decode, encode} from 'base-64'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createNativeStackNavigator();

const options = { headerShown: false };
import { DiaryContext } from "./Contexts/DiaryContext";
import { useState } from "react";
import Diary from "./Classes/Diary"
import DiaryEntry from "./Classes/DiaryEntry";


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

export async function getUUID () {
  try {
    const uid = await AsyncStorage.getItem("uid");
    if(uid !== null) {
      console.log("found:" + uid);
      return uid;
    }
  } catch(e) {
    console.log(e)
  }
 
}

export async function getDiary () {
  try {
    const uuid = await getUUID()
    const value = await AsyncStorage.getItem(uuid + "Diary");
    console.log("Diary value:" + value)
    if(value !== null) {
     
  
      return  buildDiary(JSON.parse(value));
    }
    console.log("no diary found")
    return new Diary("Diary uuid" + uuid)
  } catch(e) {

  }
 
}

export const saveDiary = async (diary) => {
  try {
    const uuid = await getUUID()
    const jsonValue = JSON.stringify(diary)
    console.log(jsonValue)
    console.log(uuid)
    await AsyncStorage.setItem(uuid + "Diary", jsonValue)
  } catch (e) {
    // saving error
  }
}

function buildDiary(JSONdiary){
  let uuid = JSONdiary.uuid
  let newDiary = new Diary(uuid)
  for(var i =0; i<JSONdiary.diary.length;i++){
    newDiary.diary.push(buildEntry(JSONdiary.diary[i]))
  }
  console.log(newDiary)
  return newDiary
}

function buildEntry(entry){
  let date = entry.date
  let breakfast = []
  let lunch = []
  let dinner = []
  const newEntry = new DiaryEntry(date)
  for(var i = 0; i<entry.breakfast.length;i++){
    console.log(i)
    breakfast.push(Object.assign(new Food(),entry.breakfast[i]))
  }

  for(var i = 0; i<entry.lunch.length;i++){
    console.log(i)
    lunch.push(Object.assign(new Food(),entry.lunch[i]))
  }

  for(var i = 0; i<entry.dinner.length;i++){
    console.log(i)
    dinner.push(Object.assign(new Food(),entry.dinner[i]))
  }

  newEntry.breakfast = breakfast
  newEntry.lunch = lunch
  newEntry.dinner = dinner
  return newEntry
}