import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableWithoutFeedback, Keyboard, Button } from "react-native";
import { globalStyles } from "../../styles/global";
import Setting from "../../components/Setting";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import * as dbConstants from "../../DatabaseConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AccountSettings({ navigation }) {
    
    const [settings, setSettings] = React.useState([
        {settingName: "First Name", dbField: dbConstants.FIRST_NAME, data: null, key: "1"},
        {settingName: "Last Name", dbField: dbConstants.LAST_NAME, data: null, key: "2"},
        {settingName: "Email", dbField: dbConstants.EMAIL, data: null, key: "3"},
        {settingName: "Password", dbField: dbConstants.PASSWORD, data: null, key: "4"},
        {settingName: "Phone Number", dbField: dbConstants.PHONE, data: null, key: "5"},
    ]);

    const [userDocSnap, setUserDocSnap] = useState(null);

    useEffect(() => {
        getUserDocSnap();
    }, []);

    const getUserDocSnap = async () => {
        const uid = await AsyncStorage.getItem("uid");
        const docRef = doc(db, "users", uid);
        const snap = await getDoc(docRef);
        setUserDocSnap(snap);
    };

    const saveChangesHandler = async () => {
        const uid = await AsyncStorage.getItem("uid");
        const userDocRef = doc(db, "users", uid);
        settings.forEach(async element => {
            if (element.data != null) {
                await updateDoc(userDocRef, {
                    [element.dbField]: element.data
                });
            }
        });
    }

    const handleCallback = (item, newData) => {
        const newSettings = [...settings];
        const index = newSettings.indexOf(item);
        const newItem = { ...item };
        newItem.data = newData;
        newSettings[index] = newItem;
        setSettings(newSettings);
    }

    return (
        <View style={globalStyles.container}>
            {userDocSnap && (<FlatList
                ListFooterComponent={<Button title={"Save Changes"} onPress={saveChangesHandler}/>} 
                data={settings}
                renderItem={({ item }) => (
                <Setting item={item} initialData={userDocSnap.get(item.dbField)} parentCallback = {handleCallback}/>
                )}
                />)}
        </View>
    );
}