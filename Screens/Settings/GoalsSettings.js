import React, { useState, useEffect } from "react";
import { View, TouchableWithoutFeedback, Keyboard, Button, FlatList, StyleSheet } from "react-native";
import { globalStyles } from "../../styles/global";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import * as dbConstants from "../../DatabaseConstants";
import RadioSetting from "../../components/RadioSetting"
import Setting from "../../components/Setting";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Goals } from "../../constants/Goals";

export default function GoalsSettings({ navigation }) {
    
    const [settings, setSettings] = React.useState([
        {settingName: "Calorie Goal", dbField: dbConstants.CALORIE_GOAL, data: null, key: "1"},
    ]);

    const [radioSettings, setRadioSettings] = React.useState([
        {settingName: "Goal", dbField: dbConstants.GOAL, data: null, key: "1"},
    ]);

    const [userDocSnap, setUserDocSnap] = useState(null);

    useEffect(() => {
        getUserDocSnap();
    }, []);

    //observes settings for changes, calls saveChangesHandler() when it detects a change (i.e., a value was updated)
    useEffect(() => {
        saveChangesHandler();
    }, [settings]);

    //observes radioSettings for changes, calls saveChangesHandler() when it detects a change (i.e., a value was updated)
    useEffect(() => {
        saveChangesHandler();
    }, [radioSettings]);

    const getUserDocSnap = async () => {
        const uid = await AsyncStorage.getItem("uid");
        const docRef = doc(db, "users", uid);
        const snap = await getDoc(docRef);
        setUserDocSnap(snap);
    };

    const saveChangesHandler = async () => {
        const uid = await AsyncStorage.getItem("uid");
        const userDocRef = doc(db, "users", uid);

        //save all normal settings
        settings.forEach(async element => {
            if (element.data != null) {
                await updateDoc(userDocRef, {
                    [element.dbField]: element.data
                });
            }
        });

        //save all radio button settings
        radioSettings.forEach(async element => {
            if (element.data != null) {
                await updateDoc(userDocRef, {
                    [element.dbField]: element.data
                });
            }
        });
    }

    const handleRadioCallback = (item, newData) => {
        const newRadioSettings = [...radioSettings];
        const index = newRadioSettings.indexOf(item);
        const newItem = { ...item };
        newItem.data = newData;
        newRadioSettings[index] = newItem;
        setRadioSettings(newRadioSettings);
    }

    const handleCallback = async (item, newData) => {
        const newSettings = [...settings];
        const index = newSettings.indexOf(item);
        const newItem = { ...item };
        newItem.data = newData;
        newSettings[index] = newItem;
        setSettings(newSettings);
        console.log(newSettings[index].data)
    }

    return (
        <View style={globalStyles.coloredContainer}>
            {userDocSnap && 
                    <FlatList
                        ListFooterComponent={
                            <View>
                                <RadioSetting item={radioSettings[0]} buttonNameList={Object.values(Goals)} initialButtonName={userDocSnap.get(radioSettings[0].dbField)} parentCallback = {handleRadioCallback}/>
                            </View>
                        }
                        data={settings}
                        renderItem={({ item }) => (
                            <Setting item={item} initialData={userDocSnap.get(item.dbField)} parentCallback = {handleCallback}/>
                    )}/>
            }
        </View>
    );
}