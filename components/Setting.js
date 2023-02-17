import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global";
import { MaterialIcons } from '@expo/vector-icons';
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Setting({ item, initialData, parentCallback }) {
    
    const [dataField, setDataField] = useState(initialData);

    const changeHandler = (val) => {
        setDataField(val);
        parentCallback(item, val)
    }

    return (
        <View>
            <View>
                <Text style={globalStyles.text}>{item.settingName}</Text>
            </View>
            <View style={styles.settingLabel}>
                <MaterialIcons style={styles.editIcon} name="edit" size={24} color="lightgray" />
                <TextInput
                    style={styles.inputField}
                    onChangeText={changeHandler}
                    value={dataField}
                    editable={true}
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
