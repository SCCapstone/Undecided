import React, { useRef } from 'react';
import { useState } from 'react';
import { View, Text, Button,TextInput, StyleSheet, FlatList, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import fetch from 'node-fetch';
import SearchResult from '../components/SearchResult';
import { COLORS } from '../constants/colors.js'


const FoodSearchScreen = ({route}) => {
    const [results, setResults ] = useState([])
    const query = useRef("")
    const {meal} = route.params
   

    const getUSDA = async (data) => {
      let dataNoSpace = data.trim().replace(' ','%20')
      if(dataNoSpace != ''){
        
        try {
          const response = await fetch(
              'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=Uq9ey8uCN07RTt4Eh7qH9T4tipiV4FRnm5fv8Wyt&query=' + dataNoSpace + '&Type=Branded&pageSize=25&pageNumber=1&requireAllWords=true&sortBy=dataType.keyword&sortOrder=asc'
          );
          const json = await response.json();
          setResults(json.foods)
        } catch (error) {
          
        }
      }
    };

const Search = ({foods}) =>{
 
  if(Object.keys(foods).length === 0){
  return <Text style={{fontSize:20, textAlign:'center'}}>No results</Text>
  }
  return  <ScrollView 
  testID='foodList'> 
   {foods.map((food) => (
     <SearchResult
     testID='foodItem'
     key={food.fdcId} 
     foodItem = {food}
     meal={meal}
     ></SearchResult>
      ))}
  </ScrollView>
}
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.default}>
          <TextInput  
            textAlign = 'center'
            placeholder='Search'
            maxLength = {47}
            onChangeText={text => query.current = text}
            onEndEditing={() => getUSDA(query.current)}
            style={styles.input}
          ></TextInput>
          <Search foods = {results}></Search>
        </View>
    </TouchableWithoutFeedback>
    )
 

}

const styles = StyleSheet.create({
  default:{
    backgroundColor: COLORS.green,
    width: '100%',
    height: '100%'
  },
  input:{
    backgroundColor: "#ABAD9A",
    borderRadius : 100,
    margin: 20,
    
  }
})



export default FoodSearchScreen