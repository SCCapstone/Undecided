import React, { useState } from "react";
import { View, TextInput, Text, FlatList, TouchableWithoutFeedback, Keyboard, Button } from "react-native";
import { globalStyles } from "../../styles/global";
import Setting from "../../components/Setting";

export default function DietaryRestrictionsSettings({ navigation }) {
    
    const [settings, setSettings] = React.useState([
        {settingName: "Dietary Restrictions", key: "1"},
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