
import { Provider } from "react-native-paper";
import StackNavigator from './StackNavigator';
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <StackNavigator/>
      </NavigationContainer>
    </Provider>
  );
}

