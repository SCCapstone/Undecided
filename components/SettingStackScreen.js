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
      <SettingsStack.Screen name="UserSettings" component={UserSettings} options={{headerShown: false, title: "User Settings"} } />
      <SettingsStack.Screen name="AccountSettings" component={AccountSettings} options={{title: "Account"}}/>
      <SettingsStack.Screen name="BiometricsSettings" component={BiometricsSettings} options={{title: "Biometrics"}}/>
      <SettingsStack.Screen name="GoalsSettings" component={GoalsSettings} options={{title: "Goals"}}/>
      <SettingsStack.Screen name="DietaryRestrictionsSettings" component={DietaryRestrictionsSettings} options={{title: "Restrictions"}} />
    </SettingsStack.Navigator>
  );
}

export default SettingStackScreen;