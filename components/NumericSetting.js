//This component is used to represent a single text-based setting.
//The numeric keyboard is used to edit the text inside each TextInput.

import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global";
import { MaterialIcons } from '@expo/vector-icons';
import {COLORS} from '../constants/colors'

export default function NumericSetting({ item, initialData, parentCallback }) {
    
    //This State variable represents the data displayed within this setting.
    const [dataField, setDataField] = useState(initialData);

    //This callback is designed to be triggered after each change of the TextInput of this setting.
    const changeHandler = (val) => {
        setDataField(val);
    }

    //This callback triggers upon the user finishing their edit to this setting.
    const endEditingHandler = (val) => {
        parentCallback(item, val.nativeEvent.text)
    }

    return (
        <View styles={styles.container}>
            <View>
                <Text style={globalStyles.text}>{item.settingName}</Text>
            </View>
            <View style={styles.settingLabel}>
                <MaterialIcons style={styles.editIcon} name="edit" size={24} color="lightgray" />
                <TextInput
                    style={styles.inputField}
                    onChangeText={changeHandler}
                    onEndEditing={endEditingHandler}
                    value={dataField}
                    editable={true}
                    keyboardType="number-pad"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    editIcon: {
        position: 'absolute',
        zIndex: 1,
        paddingLeft: 5
    },
    settingLabel: {
        flex: 1,
        flexDirection: 'row',
    },
    inputField: {
        flex: 1,
        padding: 5,
        paddingLeft: 35,
        backgroundColor: COLORS.wood,
        marginBottom: 10,
        borderRadius: 4
    },
})
