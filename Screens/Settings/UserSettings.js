import React, { useState } from "react";
import {  Pressable, View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { globalStyles } from "../../styles/global";
import { COLORS } from '../../constants/colors';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from '@react-navigation/native';

export default function UserSettings( { navigation }) {
    const [settingTypes, setSettingTypes] = useState([
        {type: 'Biometrics', screen: 'BiometricsSettings', key: '1'},
        {type: 'Dietary Restrictions', screen: 'DietaryRestrictionsSettings', key: '2'},
        {type: 'Goals', screen: 'GoalsSettings', key: '3'},
        {type: 'Account', screen: 'AccountSettings', key: '4'}
    ])
    const [type, setType] = React.useState("Email");
    const getDb = async () => {
        let uid = await AsyncStorage.getItem("uid");
        console.log("UUID: " + uid)
        let user = await getDoc(doc(db, "users", uid));
        console.log("User: " + user)
        
        setType(user.data().signinType || "Email");
      };
    const log = async () => {
        if (type == "Email") {
          await AsyncStorage.removeItem("uid");
          navigation.navigate("Auth", {initial: false})
        } else {
          AsyncStorage.removeItem("uid");
          let token = await AsyncStorage.getItem("token");
          AuthSession.revokeAsync(
            { token },
            { revocationEndpoint: "https://oauth2.googleapis.com/revoke" }
          );
        }
    };
    
    return (
        <View style={globalStyles.coloredContainer}>
            <FlatList 
                data={settingTypes}
                renderItem={ ({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate(item.screen)}>
                        <View style={globalStyles.coloredItem}>
                            <Text style={globalStyles.text}>{item.type}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        <Pressable style={styles.button} onPress={log}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: COLORS.wood,
      width: 100,
      height: 50,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      elevation: 10,
      shadowColor: "black",
    }
  });