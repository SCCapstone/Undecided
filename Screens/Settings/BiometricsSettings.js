import React, { useState, useEffect, setState } from "react";
import { View, FlatList, TouchableWithoutFeedback, Keyboard, Button } from "react-native";
import { globalStyles } from "../../styles/global";
import Setting from "../../components/Setting";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import * as dbConstants from "../../DatabaseConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AccountSettings({ navigation }) {
    
    const [settings, setSettings] = React.useState([
        {settingName: "Height", dbField: dbConstants.HEIGHT, data: null, key: "1"},
        {settingName: "Weight", dbField: dbConstants.WEIGHT, data: null, key: "2"},
        {settingName: "Age", dbField: dbConstants.AGE, data: null, key: "3"},
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
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.container}>
                {userDocSnap && (<FlatList 
                    data={settings}
                    renderItem={({ item }) => (
                    <Setting item={item} initialData={userDocSnap.get(item.dbField)} parentCallback = {handleCallback}/>
                    )}
                    />)}
                    <Button title={"Save Changes"} onPress={saveChangesHandler}/>
            </View>
            
        </TouchableWithoutFeedback>
    );

}