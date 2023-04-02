import Food from './Classes/Food'
import Diary from './Classes/Diary'
import DiaryEntry from './Classes/DiaryEntry';
import AsyncStorage from "@react-native-async-storage/async-storage";

export function getNutrientValue(foods , nutrientName) {
    let nutrientValue = 0
    let nutrient = foods.foodNutrients.find(item => item.nutrientName == nutrientName)
    if(nutrient !== undefined){
        nutrientValue = nutrient.value
    }
    return nutrientValue    
  }

  export function getNutrientUnit(foods , nutrientName) {
    let nutrientUnit = 'G'
    let nutrient = foods.foodNutrients.find(item => item.nutrientName == nutrientName)
    if(nutrient !== undefined){
    
        nutrientUnit = nutrient.unitName
    }
    return nutrientUnit 
  }

  export function jsonToFoodObject(jFood,servings){
    console.log(servings + "servings");
    const cal = getNutrientValue(jFood, 'Energy');
    const carbs = getNutrientValue(jFood, 'Carbohydrate, by difference');
    const protein = getNutrientValue(jFood, 'Protein');
    const fat = getNutrientValue(jFood, 'Total lipid (fat)');
    const sugar = getNutrientValue(jFood, 'Sugars, total including NLEA');
    const sodium = getNutrientValue(jFood, 'Sodium, Na');
    const fibre = getNutrientValue(jFood, 'Fiber, total dietary');
    const food = new Food(jFood.description,jFood.brandName,cal,carbs,protein,fat,sugar,sodium,fibre,servings,Math.ceil(jFood.servingSize),jFood.servingSizeUnit);
    
    return food;

  }

  export async function getDiary () {
    try {
      const uuid = await getUUID()
      const value = await AsyncStorage.getItem(uuid + "Diary");
      if(value !== null) {
        console.log("Getting diary for:" + uuid)
        return  buildDiary(JSON.parse(value));
      }
      console.log("no diary found")
      return new Diary("Diary uuid" + uuid)
    } catch(e) {
  
    }
   
  }

  export function buildDiary(JSONdiary){
    let uuid = JSONdiary.uuid
    let newDiary = new Diary(uuid)
    for(var i =0; i<JSONdiary.diary.length;i++){
      newDiary.diary.push(buildEntry(JSONdiary.diary[i]))
    }
    return newDiary
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

  function buildEntry(entry){
    let date = entry.date
    let breakfast = []
    let lunch = []
    let dinner = []
    let snacks = []
    const newEntry = new DiaryEntry(date)
    for(var i = 0; i<entry.breakfast.length;i++){
      breakfast.push(Object.assign(new Food(),entry.breakfast[i]))
    }
  
    for(var i = 0; i<entry.lunch.length;i++){
      lunch.push(Object.assign(new Food(),entry.lunch[i]))
    }
  
    for(var i = 0; i<entry.dinner.length;i++){
      dinner.push(Object.assign(new Food(),entry.dinner[i]))
    }

    for(var i = 0; i<entry.snacks.length;i++){
      snacks.push(Object.assign(new Food(),entry.snacks[i]))
    }
  
    newEntry.breakfast = breakfast
    newEntry.lunch = lunch
    newEntry.dinner = dinner
    newEntry.snacks = snacks
    console.log('snacks' + snacks)
    return newEntry
  }

  export async function saveDiary(diary) {
    try {
      const uuid = await getUUID()
      const jsonValue = JSON.stringify(diary)
      await AsyncStorage.setItem(uuid + "Diary", jsonValue)
    } catch (e) {
      // saving error
    }
  }