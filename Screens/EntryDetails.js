import React,{useState} from 'react';
import { View, Text, StyleSheet,Button, TouchableOpacity, ScrollView} from 'react-native';
import { TextInput } from 'react-native-paper';
import { StackActions, useNavigation} from '@react-navigation/native';



const FoodDetails = ({route}) => {
  const navigation = useNavigation();
    const {food, meal} = route.params
    const [servings, setServings] = useState(food.getServings());

    const UpdateServings = (newServings) =>{
      if(newServings !== ''){
        setServings(newServings);
        return
      }
    }

    const UpdateFood = () =>{
      food.setServings(servings);
      navigation.dispatch(StackActions.pop(2))
      navigation.navigate("Diary")
    }
    const RemoveFood = () =>{
    
      let index = meal.indexOf(food)
      meal.splice(index,1)
      console.log(meal)
      navigation.dispatch(StackActions.pop(2))
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
            <Text style={styles.textRight}>{food.getServingSize()}{food.getServingSizeUnit()}</Text>
          </View>
          <View style={styles.flexrow}>
            <Text style={styles.textLeft}>Calories</Text>
            <Text style={styles.textRight}>{food.getCalories()}G</Text>
          </View>
          <View style={styles.flexrow}>
            <Text style={styles.textLeft}>Protein</Text>
            <Text style={styles.textRight}>{food.getProtein()}G</Text>
          </View>
          <View style={styles.flexrow}>
            <Text style={styles.textLeft}>Fat</Text>
            <Text style={styles.textRight}>{food.getFat()}G</Text>
          </View>
          <View style={styles.flexrow}>
            <Text style={styles.textLeft}>Carbs</Text>
            <Text style={styles.textRight}>{food.getCarbs()}G</Text>
          </View>
          <View style={styles.flexrow}>
            <Text style={styles.textLeft}>Sugar</Text>
            <Text style={styles.textRight}>{food.getSugar()}G</Text>
          </View>
          <View style={styles.flexrow}>
            <Text style={styles.textLeft}>Sodium</Text>
            <Text style={styles.textRight}>{food.getSodium()}MG</Text>
          </View>
          <View style={styles.flexrow}>
            <Text style={styles.textLeft}>Fiber</Text>
            <Text style={styles.textRight}>{food.getFibre()}G</Text>
          </View>
          <View style = {styles.flexrow}>
                <View  style={styles.tab}>
          <TouchableOpacity onPress={() => UpdateFood()}>
              <Text style={{textAlign: 'center', fontSize: 20}}>Update Entry</Text>
            </TouchableOpacity>
          </View > 
          <View  style={styles.tab}>
            <TouchableOpacity onPress={() => RemoveFood()}>
              <Text style={{textAlign: 'center', fontSize: 20}}>Remove Entry</Text>
            </TouchableOpacity>
          </View>
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
      paddingBottom: 20,
      justifyContent: 'space-between'
  },
  tab:{
    backgroundColor: "#58C5CC",
    borderRadius: 100,
    marginTop:30,
    height: 30,
    width: '40%',
    
    
}
    
  });

export default FoodDetails

