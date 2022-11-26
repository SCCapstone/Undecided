import React from 'react';
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from './Screens/HomeScreen'
import DiaryScreen from './Screens/DiaryScreen';
import FoodSearchScreen from './Screens/FoodSearchScreen'

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Diary" component={DiaryScreen}/>
            <Stack.Screen name="FoodSearch" component={FoodSearchScreen}/>
        </Stack.Navigator>
    )
}

export default StackNavigator