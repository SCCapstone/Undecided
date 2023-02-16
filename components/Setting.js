import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global";
import { MaterialIcons } from '@expo/vector-icons';
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Setting({ item, handleChange, dbField }) {
    
    const [userDocSnap, setUserDocSnap] = useState(null);
    const [dataField, setDataField] = useState();

    useEffect(() => {
        getUserDocSnap();
    }, []);

    const getUserDocSnap = async () => {
        const uid = await AsyncStorage.getItem("uid");
        const docRef = doc(db, "users", uid);
        const snap = await getDoc(docRef);
        console.log("from getUserDocSnap: " + snap.get("firstName"))
        setUserDocSnap(snap);
    };

    return (
        <View>
            <View>
                <Text style={globalStyles.text}>{item.settingName}</Text>
            </View>
            <View style={styles.settingLabel}>
                <MaterialIcons style={styles.editIcon} name="edit" size={24} color="lightgray" />
                {//conditionally render textInput after userDocSnap is no longer null
                userDocSnap && (
                <TextInput
                    style={styles.inputField}
                    onChangeText={handleChange}
                    value={userDocSnap.get(dbField)}
                    editable={true}
                />
                )}
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
