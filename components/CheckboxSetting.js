

//This setting component is designed to display several choices to the user in the form of a single checkbox.

import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { globalStyles } from "../styles/global";
import Checkbox from 'expo-checkbox';

export default function CheckboxSetting({ item, isInitiallyChecked, parentCallback }) {
    
    //Stateful boolean to represent the checked state of this checkbox.
    const [isChecked, setIsChecked] = useState(isInitiallyChecked);

    //This function is triggered whenever this checkbox's checked status is changed.
    const changeHandler = (checkboxData) => {
        setIsChecked(checkboxData);
        parentCallback(item, checkboxData);
    }

    return (
        <View style={globalStyles.coloredItem}>
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
