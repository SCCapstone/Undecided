//A screen to represent the user's current settings for their goals.

import React, { useState, useEffect } from "react";
import { View, TouchableWithoutFeedback, Keyboard, FlatList, } from "react-native";
import { globalStyles } from "../../styles/global";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import * as dbConstants from "../../DatabaseConstants";
import RadioSetting from "../../components/RadioSetting"
import NumericSetting from "../../components/NumericSetting";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Goals } from "../../constants/Goals";

export default function GoalsSettings({ navigation }) {
    
    //A state variable to hold this screen's list of goals settings
    const [settings, setSettings] = React.useState([
        {settingName: "Calorie Goal", dbField: dbConstants.CALORIE_GOAL, data: null, key: "1"},
    ]);

    //A state variable to hold this screen's list of radio settings
    const [radioSettings, setRadioSettings] = React.useState([
        {settingName: "Goal", dbField: dbConstants.GOAL, data: null, key: "1"},
    ]);

    //A state variable to represent this user's document snapshot as it exists in Firebase.
    const [userDocSnap, setUserDocSnap] = useState(null);

    //Hook to ensure an up-to-date version of the user's document snapshot is held after each render of this component.
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

    //Retrieve the current user's document snapshot from Firebase.
    const getUserDocSnap = async () => {
        const uid = await AsyncStorage.getItem("uid");
        const docRef = doc(db, "users", uid);
        const snap = await getDoc(docRef);
        setUserDocSnap(snap);
    };

    //Handles saving the settings displayed on this screen to Firebase.
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

    //Callback passed to child RadioSetting components to update this screen's radioSettings state variable.
    const handleRadioCallback = (item, newData) => {
        const newRadioSettings = [...radioSettings];
        const index = newRadioSettings.indexOf(item);
        const newItem = { ...item };
        newItem.data = newData;
        newRadioSettings[index] = newItem;
        setRadioSettings(newRadioSettings);
    }

    //Callback passed to child RadioSetting components to update this screen's settings state variable.
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                                <NumericSetting item={item} initialData={userDocSnap.get(item.dbField)} parentCallback = {handleCallback}/>
                        )}/>
                }
            </View>
        </TouchableWithoutFeedback>
    );
}