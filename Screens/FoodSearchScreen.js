import React, { useRef } from 'react';
import { useState } from 'react';
import { View, Text, Button,TextInput, StyleSheet, FlatList, ScrollView, } from 'react-native';
import fetch from 'node-fetch';
import SearchResult from '../components/SearchResult';

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


    return(
     <View style={styles.default}>
        <TextInput  
          textAlign = 'center'
          placeholder='Search'
          maxLength = {47}
          onChangeText={text => query.current = text}
          onEndEditing={() => getUSDA(query.current)}
          style={styles.input}
         ></TextInput>

         <ScrollView 
         testID='foodList'> 
          {results.map((food) => (
            <SearchResult
            testID='foodItem'
            key={food.fdcId} 
            foodItem = {food}
            meal={meal}
            ></SearchResult>
             ))}
         </ScrollView>
        
   
 
     </View>
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



export default FoodSearchScreen