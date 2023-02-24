import React, { useState, useEffect, setState } from "react";
import { View, FlatList, TouchableWithoutFeedback, Keyboard, Button } from "react-native";
import { globalStyles } from "../../styles/global";
import Setting from "../../components/Setting";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import * as dbConstants from "../../DatabaseConstants";
import RadioSetting from "../../components/RadioSetting"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DietaryRestrictions } from "../../constants/DietaryRestrictions";

export default function DietaryRestrictionsSettings({ navigation }) {

    const [radioSettings, setRadioSettings] = React.useState([
        {settingName: "Dietary Restrictions", dbField: dbConstants.DIETARY_RESTRICTIONS, data: null, key: "1"},
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
                {userDocSnap && [
                    <View>
                        <RadioSetting item={radioSettings[0]} buttonNameList={Object.values(DietaryRestrictions)} initialButtonName={userDocSnap.get(radioSettings[0].dbField)} parentCallback = {handleRadioCallback}/>
                    </View>
                ]}
                <Button title={"Save Changes"} onPress={saveChangesHandler}/>
            </View>
            
        </TouchableWithoutFeedback>
    );

}