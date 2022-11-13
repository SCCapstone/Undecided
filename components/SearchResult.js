import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'

const SearchResult = (props) => {
   //on press method is a place holder untill food detail screens
  return (
    <TouchableOpacity style={styles.tab} onPress={() => console.log(props.foodItem.description)} >
        <Text style={styles.text} >{props.foodItem.description} </Text>
            <View style={{flexDirection: 'row'}}>
            <Text style={styles.textOnLeft}>{props.foodItem.brandName}</Text>
            <Text style={styles.textOnLeft}>{Math.ceil(props.foodItem.servingSize)}{props.foodItem.servingSizeUnit}</Text>
            <Text style={styles.textright}>{Math.ceil(props.foodItem.servingSize/100 * getNutrientValue(props.foodItem, 'Energy'))} Cal</Text>

            </View>
    </TouchableOpacity> 
  )

}

// The USDA api sometimes returns empty arrays for nutrients resulting in a null pointer error 
const getNutrientValue = (foods , nutrientName) => {
    let nutrientValue = 0
    try {
        nutrientValue = foods.foodNutrients.find(item => item.nutrientName == nutrientName).value
      } catch (error) {
        console.error(error);
      }
      return nutrientValue
  }

const styles = StyleSheet.create({
    tab:{
        backgroundColor: "#ffffff",
        borderRadius: 100,
        margin: 5,
        
        
    },

    text: {
        paddingLeft: "5%"
    },

    textright:{
       marginRight: '5%'
    },

    textOnLeft:{
        flex:1,
        paddingLeft: "5%"
    },

    flexrow:{
        flex: 1,
        flexDirection: 'row',
    }
})
export default SearchResult