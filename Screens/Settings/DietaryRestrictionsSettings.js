import React, { useState, useEffect } from "react";
import { ScrollView, View, FlatList, TouchableWithoutFeedback, Keyboard, Button } from "react-native";
import { globalStyles } from "../../styles/global";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import * as dbConstants from "../../DatabaseConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DietaryRestrictions } from "../../constants/DietaryRestrictions";
import CheckboxSetting from "../../components/CheckboxSetting";

export default function DietaryRestrictionsSettings({ navigation }) {

    const [checkboxSettings, setCheckboxSettings] = React.useState(null);

    const [userDocSnap, setUserDocSnap] = useState(null);

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

    useEffect(() => {
        getUserDocSnap();
    }, []);
    
    useEffect(() => {
        if (userDocSnap != null) {
            getSettingsObjects().then((settings) => {
                setCheckboxSettings(settings);
            });
        }
    }, [userDocSnap]);

    const getUserDocSnap = async () => {
        const uid = await AsyncStorage.getItem("uid");
        const docRef = doc(db, "users", uid);
        const snap = await getDoc(docRef);
        setUserDocSnap(snap);
    };

    const saveChangesHandler = async () => {
        const uid = await AsyncStorage.getItem("uid");
        const userDocRef = doc(db, "users", uid);

        const checkedBoxes = checkboxSettings.filter(box => box.isChecked);
        const checkedBoxesStrings = [];
        checkedBoxes.forEach(box => {
            checkedBoxesStrings.push(box.settingName)
        });

        const restrictionsString = checkedBoxesStrings.join(", ");

        await updateDoc(userDocRef, {
            [dbConstants.DIETARY_RESTRICTIONS]: restrictionsString
        });
    }

    const handleCheckboxCallback = (item, newData) => {
        const newCheckboxSettings = [...checkboxSettings];
        const index = newCheckboxSettings.indexOf(item);
        const newItem = { ...item };
        newItem.isChecked = newData;
        newCheckboxSettings[index] = newItem;
        setCheckboxSettings(newCheckboxSettings);
    }

    return (
        <View style={globalStyles.container}>
            {userDocSnap && (<FlatList 
                ListFooterComponent={<Button title={"Save Changes"} onPress={saveChangesHandler}/>}
                data={checkboxSettings}
                renderItem={({ item }) => (
                    <CheckboxSetting item={item} isInitiallyChecked={userDocSnap.get(dbConstants.DIETARY_RESTRICTIONS).includes(item.settingName)} parentCallback = {handleCheckboxCallback}/>
                )}
                />)}
        </View>
    );
}