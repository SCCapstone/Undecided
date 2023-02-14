import React from 'react';
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from './Screens/Home'
import DiaryScreen from './Screens/DiaryScreen';
import FoodSearchScreen from './Screens/FoodSearchScreen'
import Loading from './Screens/Loading'
import Auth from "./Screens/Auth";
import AuthAuth from "./Screens/AutoAuth";
import FoodDetails from './Screens/FoodDetails';
import UserSettings from './Screens/Settings/UserSettings';
import BiometricsSettings from './Screens/Settings/BiometricsSettings';
import DietaryRestrictionsSettings from './Screens/Settings/DietaryRestrictionsSettings';
import GoalsSettings from './Screens/Settings/GoalsSettings';
import AccountSettings from './Screens/Settings/AccountSettings';
import EntryDetails from './Screens/EntryDetails'


const Stack = createNativeStackNavigator();
const options = { headerShown: false };
const StackNavigator = () => {
    return(
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Loading" component={Loading} options={options} />
            <Stack.Screen name="Home" component={HomeScreen} options={options}/>
            <Stack.Screen name="Diary" component={DiaryScreen}/>
            <Stack.Screen name="FoodSearch" component={FoodSearchScreen} options={{ title: "Food Search" }}/>
            <Stack.Screen name="FoodDetails" component={FoodDetails} options={{ title: "Nutritional Information" }} />
            <Stack.Screen name="EntryDetails" component={EntryDetails} options={{ title: "Nutritional Information" }} />
            <Stack.Screen name="Auth" component={Auth} options={{ title: "Life React" }}/>
            <Stack.Screen name="UserSettings" component={UserSettings} options={{ title: "Settings" }}/>
            <Stack.Screen name="BiometricsSettings" component={BiometricsSettings} options={{ title: "Settings" }}/>
            <Stack.Screen name="DietaryRestrictionsSettings" component={DietaryRestrictionsSettings} options={{ title: "Settings" }}/>
            <Stack.Screen name="GoalsSettings" component={GoalsSettings} options={{ title: "Settings" }}/>
            <Stack.Screen name="AccountSettings" component={AccountSettings} options={{ title: "Settings" }}/>
        </Stack.Navigator>
    )
}

export default StackNavigator

