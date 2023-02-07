import React, {useState, useRef, useContext} from 'react';
import { DiaryContext } from '../Contexts/DiaryContext';
import { View, Text, Button,ScrollView,StyleSheet} from 'react-native';
import SearchResult from '../components/SearchResult'
import Diary from '../Classes/Diary';




const DiaryScreen = ({navigation}) => {
    const {diary, setDiary} = useContext(DiaryContext)
    const selectedDate = useRef(new Date())
    const [breakfast, setBreakfast] = useState([])
    const [day, setDay] = useState(selectedDate.current.getDate())
    const [month, setmonth] = useState(selectedDate.current.getMonth())
    const [year, setyear] = useState(selectedDate.current.getFullYear())
 

    
    const IncrementDate = () =>{
  
        const newDate = selectedDate.current
        newDate.setDate(newDate.getDate()+1)
        setDay(newDate.getDate())
        if(month !== newDate.getMonth() || year !== newDate.getFullYear()){
            setmonth(newDate.getMonth())
            setyear(newDate.getFullYear())
        }
     

    }
    
    return(
     <ScrollView style={styles.default}>
        <Text style={{ backgroundColor: "#fe7b5f", textAlign:"center", fontWeight:'bold', fontSize:20}}>Breakfast</Text>
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
         <Text style={{ backgroundColor: "#fe7b5f", textAlign:"center", fontWeight:'bold', fontSize:20, marginTop:20}}>lunch</Text>
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
         <Text style={{ backgroundColor: "#fe7b5f", textAlign:"center", fontWeight:'bold', fontSize:20, marginTop:20}}>Dinner</Text>
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
      
    }
  })

export default DiaryScreen