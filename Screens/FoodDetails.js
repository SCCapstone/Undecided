import React,{useState, useContext} from 'react';
import { View, Text, StyleSheet,Button, TouchableOpacity, ScrollView} from 'react-native';
import { TextInput } from 'react-native-paper';
import { getNutrientValue, getNutrientUnit } from '../util';
import { DiaryContext } from '../Contexts/DiaryContext';
import { StackActions, useNavigation} from '@react-navigation/native';



const FoodDetails = ({route}) => {
  const navigation = useNavigation();
    const {food, meal} = route.params
    const [servings, setServings] = useState(1);
    const {diary, setDiary} = useContext(DiaryContext)

    const UpdateServings = (newServings) =>{
      if(newServings !== ''){
        setServings(newServings)
        return
      }
      setServings(1)
    }

    const UpdateDiary = () =>{
      const newDiary = diary
      switch(meal){
        case "breakfast":
          newDiary.addBreakfast(food)
          break
        case "lunch":
          newDiary.addLunch(food)
          break
        case "dinner":
          newDiary.addDinner(food)
          break
      }
      navigation.dispatch(StackActions.pop(3))
      navigation.navigate("Diary")
    }
    return(
     <ScrollView style={{ backgroundColor: "#fe7b5f"}}>
        <Text style={{ backgroundColor: "#fe7b5f", textAlign:"center", fontWeight:'bold', fontSize:20}}>{food.description}</Text>
        <View style={{height:1, backgroundColor:'black'}}></View>
        <View style={{backgroundColor: "#fe7b5f",height:'100%',width:'100%'}}>
        <View style={styles.flexrow}>
            <Text style={styles.textLeft}>Number of Servings</Text>
            <TextInput  style={styles.textInputRight}  maxLength={2} placeholder={String(servings)} keyboardType='numeric' onChangeText={text => UpdateServings(text)}></TextInput>
          </View>
          <View style={styles.flexrow}>
            <Text style={styles.textLeft}>Serving Size</Text>
            <Text style={styles.textRight}>{Math.ceil(food.servingSize)*parseInt(servings)}{food.servingSizeUnit}</Text>
          </View>
          <View style={styles.flexrow}>
            <Text style={styles.textLeft}>Calories</Text>
            <Text style={styles.textRight}>{Math.ceil(food.servingSize/100 * getNutrientValue(food, 'Energy'))*servings}</Text>
          </View>
          <View style={styles.flexrow}>
            <Text style={styles.textLeft}>Protein</Text>
            <Text style={styles.textRight}>{Math.ceil(food.servingSize/100 * getNutrientValue(food, 'Protein'))*servings}{getNutrientUnit(food, 'Protein')}</Text>
          </View>
          <View style={styles.flexrow}>
            <Text style={styles.textLeft}>Fat</Text>
            <Text style={styles.textRight}>{Math.ceil(food.servingSize/100 * getNutrientValue(food, 'Total lipid (fat)'))*servings}{getNutrientUnit(food, 'Total lipid (fat)')}</Text>
          </View>
          <View style={styles.flexrow}>
            <Text style={styles.textLeft}>Carbs</Text>
            <Text style={styles.textRight}>{Math.ceil(food.servingSize/100 * getNutrientValue(food, 'Carbohydrate, by difference'))*servings}{getNutrientUnit(food, 'Carbohydrate, by difference')}</Text>
          </View>
          <View style={styles.flexrow}>
            <Text style={styles.textLeft}>Sugar</Text>
            <Text style={styles.textRight}>{Math.ceil(food.servingSize/100 * getNutrientValue(food, 'Sugars, total including NLEA'))*servings}{getNutrientUnit(food, 'Sugars, total including NLEA')}</Text>
          </View>
          <View style={styles.flexrow}>
            <Text style={styles.textLeft}>Sodium</Text>
            <Text style={styles.textRight}>{Math.ceil(food.servingSize/100 * getNutrientValue(food, 'Sodium, Na'))*servings}{getNutrientUnit(food, 'Sodium, Na')}</Text>
          </View>
          <View style={styles.flexrow}>
            <Text style={styles.textLeft}>Fiber</Text>
            <Text style={styles.textRight}>{Math.ceil(food.servingSize/100 * getNutrientValue(food, 'Fiber, total dietary'))*servings}{getNutrientUnit(food, 'Fiber, total dietary')}</Text>
          </View>
          <View  style={styles.tab}>
            <TouchableOpacity onPress={() => UpdateDiary()}>
              <Text style={{textAlign: 'center', fontSize: 20}}>Add To Diary</Text>
            </TouchableOpacity>
          </View>
        </View>
     </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 8,
      backgroundColor: "#fe7b5f"
     
    },
 
  textRight:{
     marginRight: '5%',
     fontSize: 20
  },
  textInputRight:{
    marginRight: '5%',
 },

  textLeft:{
      flex:1,
      paddingLeft: "5%",
      fontWeight:"bold",
      fontSize: 20
  },

  flexrow:{
    
      flexDirection: 'row',
      paddingTop:20,
      paddingBottom: 20
  },
  tab:{
    backgroundColor: "#58C5CC",
    borderRadius: 100,
    marginTop:30,
    height: 30,
    width: '50%',
    alignSelf:'center'
    
    
}
    
  });

export default FoodDetails

