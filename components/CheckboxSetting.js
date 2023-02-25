
/*
This setting component is designed to display several choices to the user in the form of radio buttons.
The user may only select one button.
For multiple selection, use CheckboxSetting.
*/
import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { globalStyles } from "../styles/global";
import Checkbox from 'expo-checkbox';

export default function CheckboxSetting({ item, isInitiallyChecked, parentCallback }) {
    
    const [isChecked, setIsChecked] = useState(isInitiallyChecked);

    const changeHandler = (checkboxData) => {
        setIsChecked(checkboxData);
        parentCallback(item, checkboxData);
    }

    return (
        <View style={globalStyles.item}>
            <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={changeHandler}
            />
            <Text style={globalStyles.text}>{item.settingName}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    checkbox: {
        marginRight: 8,
        marginTop: 5
    }
})
