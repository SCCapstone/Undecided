import React, {useState, useRef, useContext} from 'react';
import { DiaryContext } from '../Contexts/DiaryContext';
import { View, Text, Button,ScrollView,StyleSheet} from 'react-native';
import SearchResult from '../components/SearchResult'
import Diary from '../Classes/Diary';
import { TouchableOpacity } from 'react-native';




const DiaryScreen = ({navigation}) => {
    const {diary, setDiary} = useContext(DiaryContext)
    const selectedDate = useRef(new Date())
    const [selectedDateString, setSelectedDate] = useState(selectedDate.current.toDateString())
 
 

    
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
        <Text style={styles.meal}>Breakfast</Text>
        <View style={{height:1, backgroundColor:'black'}}></View>
        <Button title='add breakfast' onPress={() => navigation.navigate("FoodSearch", {meal:'breakfast'}) }></Button>
        <ScrollView> 
            {diary.breakfast.map((food) => (
                <SearchResult
                key={food.fdcId} 
                foodItem = {food}
                ></SearchResult>
             ))}
         </ScrollView>
         <Text style={styles.meal}>lunch</Text>
        <View style={{height:1, backgroundColor:'black'}}></View>
        <Button title='add lunch' onPress={() => navigation.navigate("FoodSearch", {meal:'lunch'}) }></Button>
        <ScrollView> 
            {diary.lunch.map((food) => (
                <SearchResult
                key={food.fdcId} 
                foodItem = {food}
                 
                ></SearchResult>
             ))}
         </ScrollView>
         <Text style={styles.meal}>Dinner</Text>
        <View style={{height:1, backgroundColor:'black'}}></View>
        <Button title='add dinner' onPress={() => navigation.navigate("FoodSearch", {meal:'dinner'}) }></Button>
        <ScrollView> 
            {diary.dinner.map((food) => (
                <SearchResult
                key={food.fdcId} 
                foodItem = {food}
                 
                ></SearchResult>
             ))}
         </ScrollView>
     </ScrollView>
    )
}

const styles = StyleSheet.create({
    default:{
      backgroundColor: "#fe7b5f",
      width: '100%',
      height: '100%'
    },
    input:{
      backgroundColor: "#c1c1c1",
      borderRadius : 100,
      margin: 20,
      
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
    }

  })

export default DiaryScreen