import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Screens/Home";
import SettingStackScreen from "./SettingStackScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import DiaryStackScreen from "./DiaryStackScreen";

const HomeTab = createBottomTabNavigator();

function HomeTabScreen() {
  return (
    <HomeTab.Navigator 
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;
        if(route.name === 'Home Screen'){
          iconName = focused ? 'home' : 'home-outline';
        } else if(route.name === 'Diary Screen'){
          iconName = focused ? 'book' : 'book-outline';
        } else if(route.name === 'Settings'){
          iconName = focused ? 'settings' : 'settings-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      }
    })} >
      <HomeTab.Screen name="Home Screen" component={Home} />
      <HomeTab.Screen name="Diary Screen" component={DiaryStackScreen} />
      <HomeTab.Screen name="Settings" component={SettingStackScreen} />
    </HomeTab.Navigator>
  );
}

export default HomeTabScreen;