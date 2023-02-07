import React, { useState } from "react";
import { View, TextInput, Text, FlatList, TouchableWithoutFeedback, Keyboard, Button } from "react-native";
import { globalStyles } from "../../styles/global";
import Setting from "../../components/Setting";

export default function AccountSettings({ navigation }) {
    
    const [settings, setSettings] = React.useState([
        {settingName: "First Name", key: "1"},
        {settingName: "Last Name", key: "2"},
        {settingName: "Email", key: "3"},
        {settingName: "Password", key: "4"},
        {settingName: "Phone Number", key: "5"},
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