import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { getNutrientValue } from '../util'


const SearchResult = (props) => {
   //on press method is a place holder untill food detail screen is complete 
   const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate("FoodDetails", {food: props.foodItem, meal: props.meal}) } >
        <Text style={styles.text}>{props.foodItem.description} </Text>
            <View style={{flexDirection: 'row'}}>
            <Text style={styles.textOnLeft}>{props.foodItem.brandName}</Text>
            <Text style={styles.textOnLeft}>{Math.ceil(props.foodItem.servingSize)}{props.foodItem.servingSizeUnit}</Text>
            <Text style={styles.textright}>{Math.ceil(props.foodItem.servingSize/100 * parseInt(getNutrientValue(props.foodItem, 'Energy')))} Cal</Text>
            </View>
    </TouchableOpacity> 
  )

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