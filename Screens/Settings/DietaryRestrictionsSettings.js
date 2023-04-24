//A screen to represent the user's current settings for their dietary restrictions.

import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { globalStyles } from "../../styles/global";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import * as dbConstants from "../../DatabaseConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DietaryRestrictions } from "../../constants/DietaryRestrictions";
import CheckboxSetting from "../../components/CheckboxSetting";

export default function DietaryRestrictionsSettings({ navigation }) {

    //A state variable to hold this screen's list of checkbox settings
    const [checkboxSettings, setCheckboxSettings] = React.useState(null);

    //A state variable to represent this user's document snapshot as it exists in Firebase.
    const [userDocSnap, setUserDocSnap] = useState(null);

    //Utility function to get a list of all of the settings objects from the DietaryRestrictions enum and turn them into an array of objects.
    async function getSettingsObjects() {
        const dietaryRestrictionsArray = Object.values(DietaryRestrictions);
        const currentRestrictions = userDocSnap.get(dbConstants.DIETARY_RESTRICTIONS)
        const objectArray = [];
        if (currentRestrictions != null) {
            for (var i = 0; i < dietaryRestrictionsArray.length; i++) {
                const settingName = dietaryRestrictionsArray[i]
                const key = (i+1).toString();
                const object = {settingName: settingName, isChecked: currentRestrictions.includes(settingName), key: key}
                objectArray.push(object)
            }
        }

        return objectArray;
    }

    //Hook to ensure an up-to-date version of the user's document snapshot is held after each render of this component.
    useEffect(() => {
        getUserDocSnap();
    }, []);
    

    //If the user doc snap is not null, set the checkbox settings after converting them to settings objects.
    useEffect(() => {
        if (userDocSnap != null) {
            getSettingsObjects().then((settings) => {
                setCheckboxSettings(settings);
            });
        }
    }, [userDocSnap]);

    //observes settings for changes, calls saveChangesHandler() when it detects a change (i.e., a value was updated)
    useEffect(() => {
        saveChangesHandler();
    }, [checkboxSettings]);

    //Retrieve the current user's document snapshot from Firebase.
    const getUserDocSnap = async () => {
        const uid = await AsyncStorage.getItem("uid");
        const docRef = doc(db, "users", uid);
        const snap = await getDoc(docRef);
        setUserDocSnap(snap);
    };

    //Handles saving the settings displayed on this screen to Firebase.
    const saveChangesHandler = async () => {
        if (checkboxSettings == null) return;
        const uid = await AsyncStorage.getItem("uid");
        const userDocRef = doc(db, "users", uid);

        //Filter the checkedBoxes state variable for only boxes that are checked, and put them into an array
        const checkedBoxes = checkboxSettings.filter(box => box.isChecked);
        const checkedBoxesStrings = [];
        checkedBoxes.forEach(box => {
            checkedBoxesStrings.push(box.settingName)
        });

        //Join the string array into one string
        const restrictionsString = checkedBoxesStrings.join(", ");

        //Store the string created above
        await updateDoc(userDocRef, {
            [dbConstants.DIETARY_RESTRICTIONS]: restrictionsString
        });
    }

    //This callback is passed to child setting components to update the settings objects stored in this screen's State.
    const handleCheckboxCallback = (item, newData) => {
        const newCheckboxSettings = [...checkboxSettings];
        const index = newCheckboxSettings.indexOf(item);
        const newItem = { ...item };
        newItem.isChecked = newData;
        newCheckboxSettings[index] = newItem;
        setCheckboxSettings(newCheckboxSettings);
    }

    return (
        <View style={globalStyles.coloredContainer}>
            {userDocSnap && (<FlatList
                data={checkboxSettings}
                renderItem={({ item }) => (
                    <CheckboxSetting item={item} isInitiallyChecked={userDocSnap.get(dbConstants.DIETARY_RESTRICTIONS).includes(item.settingName)} parentCallback = {handleCheckboxCallback}/>
                )}
                />)}
        </View>
    );
}