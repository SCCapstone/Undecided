import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global";
import { MaterialIcons } from '@expo/vector-icons';

export default function Setting({ item, handleChange }) {

    return (
        <View>
            <View>
                <Text style={globalStyles.text}>{item.settingName}</Text>
            </View>
            <View style={styles.settingLabel}>
                <MaterialIcons style={styles.editIcon} name="edit" size={24} color="lightgray" />
                <TextInput style={styles.inputField} onChangeText={handleChange} placeholder={"Placeholder"} editable={true} />
            </View>
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