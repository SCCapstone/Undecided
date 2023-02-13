import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';



const SearchResult = (props) => {

   const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate("EntryDetails", {food: props.foodItem, food: props.foodItem}) } >
        <Text style={styles.text} >{props.foodItem.getName()} </Text>
            <View style={{flexDirection: 'row'}}>
            <Text style={styles.textOnLeft}>{props.foodItem.getBrandName()}</Text>
            <Text style={styles.textOnLeft}>{props.foodItem.getServingSize()}{props.foodItem.getServingSizeUnit()}</Text>
            <Text style={styles.textright}>{props.foodItem.getCalories()} Cal</Text>
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