import React, { useState } from "react";
import { View, TextInput, Text, FlatList, TouchableWithoutFeedback, Keyboard, Button } from "react-native";
import { globalStyles } from "../../styles/global";
import Setting from "../../components/Setting";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";


export default function GoalsSettings({ navigation }) {
    
    const [settings, setSettings] = React.useState([
        {settingName: "Calorie Goal", key: "1"},
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
                    <Setting item={item} handleChange={changeHandler}/>
                    )}
                    />
                    <Button title={"Save Changes"} onPress={saveChangesHandler}/>
            </View>
            
        </TouchableWithoutFeedback>
    );
}