import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button} from 'react-native';



const HomeScreen= () => {
    const navigation = useNavigation();
    return(

     <View>
        <Text>Home Screen placeholder</Text>
        <Button title='diary screen' onPress={() => navigation.navigate('Diary')}/>
        <Button title='food search screen' onPress={() => navigation.navigate('FoodSearch')}/>
     </View>
    )
}

export default HomeScreen