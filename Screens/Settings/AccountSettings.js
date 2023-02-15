import React, { useState } from "react";
import { View, TextInput, Text, FlatList, TouchableWithoutFeedback, Keyboard, Button } from "react-native";
import { globalStyles } from "../../styles/global";
import Setting from "../../components/Setting";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import * as dbConstants from "../../DatabaseConstants";

export default function AccountSettings({ navigation }) {
    
    const [settings, setSettings] = React.useState([
        {settingName: "First Name", dbField: dbConstants.FIRST_NAME, key: "1"},
        {settingName: "Last Name", dbField: dbConstants.LAST_NAME, key: "2"},
        {settingName: "Email", dbField: dbConstants.EMAIL, key: "3"},
        {settingName: "Password", dbField: dbConstants.PASSWORD, key: "4"},
        {settingName: "Phone Number", dbField: dbConstants.PHONE, key: "5"},
        {settingName: "Age", dbField: dbConstants.AGE, key: "6"},
    ]);

    const changeHandler = val => {
        //nothing yet
    }

    const saveChangesHandler = () => {
        //nothing yet
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.container}>
                <FlatList 
                    data={settings}
                    renderItem={({ item }) => (
                    <Setting item={item} handleChange={changeHandler} dbField={item.dbField}/>
                    )}
                    />
                    <Button title={"Save Changes"} onPress={saveChangesHandler}/>
            </View>
            
        </TouchableWithoutFeedback>
    );

}