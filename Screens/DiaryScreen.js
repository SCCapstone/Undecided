import React, {useState, useRef, useContext} from 'react';
import { DiaryContext } from '../Contexts/DiaryContext';
import { View, Text, Button,ScrollView,StyleSheet, Pressable} from 'react-native';
import { TouchableOpacity } from 'react-native';
import DiaryTile from '../components/DiaryTile'
import {saveDiary} from '../util'
import { COLORS } from '../constants/colors.js'




const DiaryScreen = ({navigation}) => {
    const {diary} = useContext(DiaryContext)
    const [selectedDateString, setSelectedDate] = useState(diary.selectedDate.toDateString())
    const entry = diary.getEntry(selectedDateString)
    saveDiary(diary)
 

    const IncrementDate = () =>{
        const newDate = diary.selectedDate
        newDate.setDate(newDate.getDate() + 1)
        setSelectedDate(newDate.toDateString())
        diary.selectedDate = newDate
        saveDiary(diary)

    }
    
    const DecrementDate = () =>{
        const newDate = diary.selectedDate
        newDate.setDate(newDate.getDate() - 1)
        setSelectedDate(newDate.toDateString())
        diary.selectedDate = newDate
        saveDiary(diary)
        
    }
    

    return(
     <ScrollView style={styles.default}>
        <View style={styles.dateContainter}>
            <TouchableOpacity onPress={() => DecrementDate() }>
                <Text style={styles.dateText}>{'<   '}</Text>
            </TouchableOpacity>
            <Text style={styles.dateText}>{selectedDateString}</Text>
            <TouchableOpacity onPress={() => IncrementDate() }>
                <Text style={styles.dateText}>{'   >'}</Text>
            </TouchableOpacity>
        </View>
        <View style={{paddingBottom:10, flex:1, flexDirection:'row', justifyContent:'center'}}>
            <Text style={styles.dateText}>{diary.calorieGoal - (entry.getCalorieTotal())} Calories Remaining</Text>
            <TouchableOpacity onPress={() => navigation.navigate("NutritionalOverview", {food: entry.getNutrientTotal()}) }>
                <Text style={{fontSize:25, color:COLORS.cream, paddingLeft:5}}>...</Text>
            </TouchableOpacity>
        </View>
        
        <Text style={styles.mealLabel}>Breakfast</Text>
        <View style={styles.line}></View>
        <Pressable style={styles.button} title='breakfast' onPress={() => navigation.navigate("FoodSearch", {meal: entry.getBreakfast()}) }>
            <Text style={styles.buttonText}>Add</Text>
        </Pressable>
        <ScrollView> 
        {entry.getBreakfast().map((food) => (
                 <DiaryTile
                 key={food.getName()} 
                 foodItem = {food}
                 meal = {entry.getBreakfast()}
                 ></DiaryTile>
             ))}
         </ScrollView>
         <Text style={styles.mealLabel}>Lunch</Text>
        <View style={styles.line}></View>
        <Pressable style={styles.button} title='lunch' onPress={() => navigation.navigate("FoodSearch", {meal: entry.getLunch()}) }>
            <Text style={styles.buttonText}>Add</Text>
        </Pressable>
        <ScrollView> 
        {entry.getLunch().map((food) => (
                 <DiaryTile
                 key={food.getName()} 
                 foodItem = {food}
                 meal = {entry.getLunch()}
                 ></DiaryTile>
             ))}
         </ScrollView>
         <Text style={styles.mealLabel}>Dinner</Text>
        <View style={styles.line}></View>
        <Pressable style={styles.button} title='dinner' onPress={() => navigation.navigate("FoodSearch", {meal: entry.getDinner()}) }>
            <Text style={styles.buttonText}>Add</Text>
        </Pressable>
        <ScrollView> 
        {entry.getDinner().map((food) => (
                 <DiaryTile
                 key={food.getName()} 
                 foodItem = {food}
                 meal = {entry.getDinner()}
                 ></DiaryTile>
             ))}
         </ScrollView>

         <Text style={styles.mealLabel}>Snacks</Text>
        <View style={styles.line}></View>
        <Pressable style={styles.button} title='snacks' onPress={() => navigation.navigate("FoodSearch", {meal: entry.getSnacks()}) }>
            <Text style={styles.buttonText}>Add</Text>
        </Pressable>
        <ScrollView> 
        {entry.getSnacks().map((food) => (
                 <DiaryTile
                 key={food.getName()} 
                 foodItem = {food}
                 meal = {entry.getSnacks()}
                 ></DiaryTile>
             ))}
         </ScrollView>
     </ScrollView>
     
    )
}

const styles = StyleSheet.create({
    default:{
      backgroundColor: COLORS.green,
      width: '100%',
      height: '100%'
    },
    input:{
      backgroundColor: "#c1c1c1",
      borderRadius : 100,
      margin: 20,
      
    },
    button: {
        backgroundColor: COLORS.wood,
        borderRadius: 10,
        height: 50,
        width: '75%',
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
        margin: 20,
        justifyContent: 'center',
        elevation:10,
        shadowColor: 'black',
        marginBottom: 5
        
    },
    buttonText: {
        fontSize: 20,
        textAlignVertical: 'center',
        margin: 'auto'
    },
    dateContainter:{
        alignSelf: 'center',
        flex:1,
        flexDirection:'row'
    },
    dateText:{
        fontSize:20,
        alignSelf:'center'
    },
    meal:{
        backgroundColor: "#fe7b5f", 
        textAlign:"center", 
        fontWeight:'bold', 
        fontSize:20,
        marginTop:20
    },
    mealLabel:{
        backgroundColor: COLORS.green,
        textAlign:"center",
        fontWeight:'bold',
        fontSize:20,
        
    },
    line:{
        height: 2,
        backgroundColor:"black",
        paddingTop:2,
        paddingBottom:2
    }

  })

export default DiaryScreen
