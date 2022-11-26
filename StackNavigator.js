import React from 'react';
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from './Screens/Home'
import DiaryScreen from './Screens/DiaryScreen';
import FoodSearchScreen from './Screens/FoodSearchScreen'
import Loading from './Screens/Loading'
import Auth from "./Screens/Auth";
import AuthAuth from "./Screens/AutoAuth";

const Stack = createNativeStackNavigator();
const options = { headerShown: false };
const StackNavigator = () => {
    return(
        <Stack.Navigator initialRouteName="Loading">
            <Stack.Screen name="Welcome" component={AuthAuth} options={options} />
            <Stack.Screen name="Loading" component={Loading} options={options} />
            <Stack.Screen name="Home" component={HomeScreen} options={options}/>
            <Stack.Screen name="Diary" component={DiaryScreen}/>
            <Stack.Screen name="FoodSearch" component={FoodSearchScreen}/>
            <Stack.Screen name="auth" component={Auth} options={{ title: "Life React" }}/>
        </Stack.Navigator>
    )
}

export default StackNavigator

