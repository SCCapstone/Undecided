
/*
This setting component is designed to display several choices to the user in the form of radio buttons.
The user may only select one button.
For multiple selection, use CheckboxSetting.
*/

import React, { useState } from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/global";
import RadioButtonRN from 'radio-buttons-react-native';
import {COLORS} from '../constants/colors'

export default function RadioSetting({ item, buttonNameList, initialButtonName, parentCallback }) {
    
    //State variable to keep track of which button is selected by its name.
    const [selectedButton, setSelectedButton] = useState(initialButtonName);

    //State variable to hold the list of buttons associated with this setting.
    const [buttonList, setButtonList] = useState(buttonNameListToObjects(buttonNameList))

    //A utility method to converting a list of button names to objects.
    //Used to initially set the buttonList state variable.
    function buttonNameListToObjects(buttonNameList) {
        const arr = [];
        buttonNameList.forEach(element => {
            const obj = {label: element};
            arr.push(obj);
        });
        return arr;
    }

    //This function handles the change of the component whenever a button is selected.
    const changeHandler = (buttonData) => {
        const label = buttonData.label;
        setSelectedButton(label)
        parentCallback(item, label);
    }

    return (
        <View >
            <Text style={globalStyles.text}>{item.settingName}</Text>
            <RadioButtonRN
                data={buttonList}
                selectedBtn={changeHandler}
                initial={buttonList.findIndex(item => item.label == initialButtonName) + 1}
                activeColor ={"black"}
                deactiveColor ={COLORS.gray}
                boxActiveBgColor={COLORS.wood}
                boxDeactiveBgColor={COLORS.wood}
            />
        </View>
    );
}