import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
/*Merge Conflict






*/
export default function App() {
  return (
    <View style={style.container}>
      <Text>KYS</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
