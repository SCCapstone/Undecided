//A screen to display the different settings categories the user can choose to navigate to in order to change their settings.

import React, { useState } from "react";
import {  Pressable, View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { globalStyles } from "../../styles/global";
import { COLORS } from '../../constants/colors';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function UserSettings( { navigation }) {
    const [settingTypes, setSettingTypes] = useState([
        {type: 'Biometrics', screen: 'BiometricsSettings', key: '1'},
        {type: 'Dietary Restrictions', screen: 'DietaryRestrictionsSettings', key: '2'},
        {type: 'Goals', screen: 'GoalsSettings', key: '3'},
        {type: 'Account', screen: 'AccountSettings', key: '4'}
    ])
  

    //Ensure a fresh version of user information is present whenever this screen is brought into focus.
    //This allows logout to be handled from this screen.
    useFocusEffect(React.useCallback(() => {
      getDb();
    }, []));
  

    //The type of login of the current user.
    const [type, setType] = React.useState("Email");

    //Asynchronous function for getting the database.
    const getDb = async () => {
      let uid = await AsyncStorage.getItem("uid");
      let user = await getDoc(doc(db, "users", uid));
      setType(user.data().signinType || "Email");
    };
  

    //Asynchronous function that logs the user out.
    //If they signed up via email, remove their uid from the session and navigate to the Auth screen (login/signup).
    //Otherwise, remove their uid from the session and revoke their token.
    const log = async () => {
      if (type == "Email") {
        await AsyncStorage.removeItem("uid");
        navigation.navigate("Auth");
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
          <Text style={globalStyles.text}>Logout</Text>
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