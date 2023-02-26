import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Screens/Home";
import DiaryScreen from "../Screens/DiaryScreen";
import SettingStackScreen from "./SettingStackScreen";
import DiaryStackScreen from "./DiaryStackScreen";

const HomeTab = createBottomTabNavigator();

function HomeTabScreen() {
  return (
    <HomeTab.Navigator>
      <HomeTab.Screen name="Home Screen" component={Home} />
      <HomeTab.Screen name="Diary Screen" component={DiaryStackScreen} />
      <HomeTab.Screen name="Settings" component={SettingStackScreen} />
    </HomeTab.Navigator>
  );
}

export default HomeTabScreen;