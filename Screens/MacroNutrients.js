
import { View, Text, StyleSheet,ScrollView} from 'react-native';
import { COLORS } from '../constants/colors.js'



const MacroNutrients = ({route}) => {
    const {food} = route.params
   



 
    return(
     <ScrollView style={{ backgroundColor: COLORS.green}}>
        <Text style={{ backgroundColor: COLORS.green, textAlign:"center", fontWeight:'bold', fontSize:20}}>Nutrient Overview</Text>
        <View style={{height:1, backgroundColor:'black'}}></View>
        <View style={{backgroundColor: COLORS.green,height:'100%',width:'100%'}}>
        <View style={styles.flexrow}>
            <Text style={styles.textLeft}>Total Calories</Text>
            <Text style={styles.textRight}>{food.getCalories()}</Text>
          </View>
          <View style={styles.flexrow}>
            <Text style={styles.textLeft}>Total Protein</Text>
            <Text style={styles.textRight}>{food.getProtein()}G</Text>
          </View>
          <View style={styles.flexrow}>
            <Text style={styles.textLeft}>Total Fat</Text>
            <Text style={styles.textRight}>{food.getFat()}G</Text>
          </View>
          <View style={styles.flexrow}>
            <Text style={styles.textLeft}>Total Carbs</Text>
            <Text style={styles.textRight}>{food.getCarbs()}G</Text>
          </View>
          <View style={styles.flexrow}>
            <Text style={styles.textLeft}>Total Sugar</Text>
            <Text style={styles.textRight}>{food.getSugar()}G</Text>
          </View>
          <View style={styles.flexrow}>
            <Text style={styles.textLeft}>Total Sodium</Text>
            <Text style={styles.textRight}>{food.getSodium()}MG</Text>
          </View>
          <View style={styles.flexrow}>
            <Text style={styles.textLeft}>Total Fiber</Text>
            <Text style={styles.textRight}>{food.getFibre()}G</Text>
          </View>
          </View>
     </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 8,
      backgroundColor: COLORS.green
     
    },
 
  textRight:{
     marginRight: '5%',
     fontSize: 20
  },
  textInputRight: {
    backgroundColor: COLORS.cream,
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
      paddingTop:10,
      paddingBottom: 10
  },
  tab:{
    backgroundColor: COLORS.blue,
    borderRadius: 100,
    marginTop:30,
    height: 30,
    width: '50%',
    alignSelf:'center'
    
    
}
    
  });

export default MacroNutrients

