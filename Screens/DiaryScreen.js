import React, {useState, useRef, useContext} from 'react';
import { DiaryContext } from '../Contexts/DiaryContext';
import { View, Text, Button,ScrollView,StyleSheet, Pressable} from 'react-native';
import { TouchableOpacity } from 'react-native';
import DiaryTile from '../components/DiaryTile'
import { COLORS } from '../constants/colors.js'
import { AuthError } from 'expo-auth-session';



const DiaryScreen = ({navigation}) => {
    const {diary} = useContext(DiaryContext)
    const selectedDate = useRef(new Date())
    const [selectedDateString, setSelectedDate] = useState(selectedDate.current.toDateString())
    const entry = diary.getEntry(selectedDateString)
 

    
    const IncrementDate = () =>{
        const newDate = selectedDate.current
        newDate.setDate(newDate.getDate() + 1)
        setSelectedDate(newDate.toDateString())
        selectedDate.current = newDate

    }
    const DecrementDate = () =>{
        const newDate = selectedDate.current
        newDate.setDate(newDate.getDate() - 1)
        setSelectedDate(newDate.toDateString())
        selectedDate.current = newDate
        
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
        <Text style={styles.mealLabel}>Breakfast</Text>
        <View style={{height:1, backgroundColor:'black'}}></View>
        <Pressable style={styles.button} title='breakfast' onPress={() => navigation.navigate("FoodSearch", {meal: entry.getBreakfast()}) }>
            <Text style={styles.buttonText}>Add Breakfast</Text>
        </Pressable>
        <ScrollView> 
        {entry.getBreakfast().map((food) => (
                 <DiaryTile
                 key={food.getName} 
                 foodItem = {food}
                 meal = {entry.getBreakfast()}
                 ></DiaryTile>
             ))}
         </ScrollView>
         <Text style={styles.mealLabel}>Lunch</Text>
        <View style={{height:1, backgroundColor:'black'}}></View>
        <Pressable style={styles.button} title='lunch' onPress={() => navigation.navigate("FoodSearch", {meal: entry.getLunch()}) }>
            <Text style={styles.buttonText}>Add Lunch</Text>
        </Pressable>
        <ScrollView> 
        {entry.getLunch().map((food) => (
                 <DiaryTile
                 key={food.getName} 
                 foodItem = {food}
                 meal = {entry.getLunch()}
                 ></DiaryTile>
             ))}
         </ScrollView>
         <Text style={styles.mealLabel}>Dinner</Text>
        <View style={{height:1, backgroundColor:'black'}}></View>
        <Pressable style={styles.button} title='dinner' onPress={() => navigation.navigate("FoodSearch", {meal: entry.getDinner()}) }>
            <Text style={styles.buttonText}>Add Dinner</Text>
        </Pressable>
        <ScrollView> 
        {entry.getDinner().map((food) => (
                 <DiaryTile
                 key={food.getName} 
                 foodItem = {food}
                 meal = {entry.getDinner()}
                 ></DiaryTile>
             ))}
         </ScrollView>
     </ScrollView>
    )
}

const styles = StyleSheet.create({
    default:{
      backgroundColor: COLORS.backgroundColor,
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
        
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        textAlignVertical: 'center',
        textTransform: 'uppercase',
        margin: 'auto'
    },
    dateContainter:{
        alignSelf: 'center',
        flex:1,
        flexDirection:'row'
    },
    dateText:{
        fontSize:20
    },
    meal:{
        backgroundColor: "#fe7b5f", 
        textAlign:"center", 
        fontWeight:'bold', 
        fontSize:20,
        marginTop:20
    },
    mealLabel:{
        backgroundColor: COLORS.backgroundColor,
        textAlign:"center",
        fontWeight:'bold',
        fontSize:20,
    }

  })

export default DiaryScreen