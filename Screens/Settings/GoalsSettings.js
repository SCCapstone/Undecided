import React, { useState, useEffect } from "react";
import { View, TouchableWithoutFeedback, Keyboard, Button } from "react-native";
import { globalStyles } from "../../styles/global";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import * as dbConstants from "../../DatabaseConstants";
import RadioSetting from "../../components/RadioSetting"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Goals } from "../../constants/Goals";

export default function GoalsSettings({ navigation }) {
    
    const [radioSettings, setRadioSettings] = React.useState([
        {settingName: "Goal", dbField: dbConstants.GOAL, data: null, key: "1"},
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

        //save all radio button settings
        radioSettings.forEach(async element => {
            if (element.data != null) {
                console.log(element + " has data (being saved): " + element.data)
                await updateDoc(userDocRef, {
                    [element.dbField]: element.data
                });
            }
        });
    }

    const handleRadioCallback = (item, newData) => {
        console.log(item.settingName + " is being assigned the value: " + newData + "\nProcessing...")
        const newRadioSettings = [...radioSettings];
        const index = newRadioSettings.indexOf(item);
        const newItem = { ...item };
        newItem.data = newData;
        newRadioSettings[index] = newItem;
        setRadioSettings(newRadioSettings);
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.container}>
                {userDocSnap && 
                    <RadioSetting item={radioSettings[0]} buttonNameList={Object.values(Goals)} initialButtonName={userDocSnap.get(radioSettings[0].dbField)} parentCallback = {handleRadioCallback}/>
                }
                <Button title={"Save Changes"} onPress={saveChangesHandler}/>
            </View>
        </TouchableWithoutFeedback>
    );
}