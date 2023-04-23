import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global";
import { MaterialIcons } from '@expo/vector-icons';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import {COLORS} from '../constants/colors'

export default function NumericSetting({ item, initialData, parentCallback }) {
    
    const [dataField, setDataField] = useState(initialData);

    const changeHandler = (val) => {
        setDataField(val);
    }

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


const getUserDocRef = async (uid) => {
    return doc(db, "users", uid);
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
