
/*
This setting component is designed to display several choices to the user in the form of radio buttons.
The user may only select one button.
For multiple selection, use CheckboxSetting.
*/
import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { globalStyles } from "../styles/global";
import RadioButtonRN from 'radio-buttons-react-native';

export default function RadioSetting({ item, buttonNameList, initialButtonName, parentCallback }) {
    
    const [selectedButton, setSelectedButton] = useState(initialButtonName);
    const [buttonList, setButtonList] = useState(buttonNameListToObjects(buttonNameList))

    function buttonNameListToObjects(buttonNameList) {
        const arr = [];
        buttonNameList.forEach(element => {
            const obj = {label: element};
            arr.push(obj);
        });
        return arr;
    }

    const changeHandler = (buttonData) => {
        const label = buttonData.label;
        setSelectedButton(label)
        parentCallback(item, label);
    }

    return (
        <View>
            <Text style={globalStyles.text}>{item.settingName}</Text>
            <RadioButtonRN
                data={buttonList}
                selectedBtn={changeHandler}
                initial={buttonList.findIndex(item => item.label == initialButtonName) + 1}
            />
        </View>
    );
}