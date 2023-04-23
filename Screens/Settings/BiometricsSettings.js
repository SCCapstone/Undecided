import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableWithoutFeedback, Keyboard, Button } from "react-native";
import { globalStyles } from "../../styles/global";
import NumericSetting from "../../components/NumericSetting";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import * as dbConstants from "../../DatabaseConstants";
import RadioSetting from "../../components/RadioSetting"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityLevels } from "../../constants/ActivityLevels";
import {COLORS} from '../../constants/colors'

export default function BiometricsSettings({ navigation }) {
    
    const [settings, setSettings] = React.useState([
        {settingName: "Height (cm)", dbField: dbConstants.HEIGHT, data: null, key: "1"},
        {settingName: "Weight (kg)", dbField: dbConstants.WEIGHT, data: null, key: "2"},
        {settingName: "Age", dbField: dbConstants.AGE, data: null, key: "3"},
    ]);

    const [radioSettings, setRadioSettings] = React.useState([
        {settingName: "Activity Level", dbField: dbConstants.ACTIVITY_LEVEL, data: null, key: "1"},
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

    const handleCallback = (item, newData) => {
        const newSettings = [...settings];
        const index = newSettings.indexOf(item);
        const newItem = { ...item };
        newItem.data = newData;
        newSettings[index] = newItem;
        setSettings(newSettings);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={globalStyles.coloredContainer}>
                {userDocSnap && 
                    <FlatList
                        ListFooterComponent={
                            <View >
                                <RadioSetting item={radioSettings[0]} buttonNameList={Object.values(ActivityLevels)} initialButtonName={userDocSnap.get(radioSettings[0].dbField)} parentCallback = {handleRadioCallback} />
                            </View>
                        }
                        data={settings}
                        renderItem={({ item }) => (
                            <NumericSetting item={item} initialData={userDocSnap.get(item.dbField)} parentCallback = {handleCallback} />
                    )}/>
                }
            </View>
        </TouchableWithoutFeedback>
    );
}