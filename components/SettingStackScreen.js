import { createStackNavigator } from "@react-navigation/stack";
import UserSettings from "../Screens/Settings/UserSettings";
import AccountSettings from "../Screens/Settings/AccountSettings";
import BiometricsSettings from "../Screens/Settings/BiometricsSettings";
import GoalsSettings from "../Screens/Settings/GoalsSettings";
import DietaryRestrictionsSettings from "../Screens/Settings/DietaryRestrictionsSettings";


const options = { headerShown: false };
const SettingsStack = createStackNavigator();
function SettingStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="UserSettings" component={UserSettings} options={options} />
      <SettingsStack.Screen name="AccountSettings" component={AccountSettings} />
      <SettingsStack.Screen name="BiometricsSettings" component={BiometricsSettings} />
      <SettingsStack.Screen name="GoalsSettings" component={GoalsSettings} />
      <SettingsStack.Screen name="DietaryRestrictionsSettings" component={DietaryRestrictionsSettings} />
    </SettingsStack.Navigator>
  );
}

export default SettingStackScreen;