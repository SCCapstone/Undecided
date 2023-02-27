import { createStackNavigator } from "@react-navigation/stack";
import FoodSearchScreen from "../Screens/FoodSearchScreen";
import DiaryScreen from "../Screens/DiaryScreen";
import FoodDetails from "../Screens/FoodDetails";
import EntryDetails from "../Screens/EntryDetails";

const DiaryStack = createStackNavigator();
const options = { headerShown: false };
function DiaryStackScreen() {
  return (
    <DiaryStack.Navigator  independent={true}>
      <DiaryStack.Screen name="Diary" component={DiaryScreen} options={options}/>
      <DiaryStack.Screen name="FoodSearch" component={FoodSearchScreen} />
      <DiaryStack.Screen name="FoodDetails" component={FoodDetails} />
      <DiaryStack.Screen name="EntryDetails" component={EntryDetails} />
    </DiaryStack.Navigator>
  );
}

export default DiaryStackScreen;