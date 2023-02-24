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

const styles = StyleSheet.create({
    editIcon: {
        position: 'absolute',
        zIndex: 1,
        padding: 5
    },
    settingLabel: {
        flex: 1,
        flexDirection: 'row',
    },
    inputField: {
        flex: 1,
        padding: 5,
        paddingLeft: 35,
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 4
    }
})
