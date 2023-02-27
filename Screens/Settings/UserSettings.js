import React, { useState } from "react";
import {  View, Text, FlatList, TouchableOpacity } from "react-native";
import { globalStyles } from "../../styles/global";

export default function UserSettings( { navigation }) {
    const [settingTypes, setSettingTypes] = useState([
        {type: 'Biometrics', screen: 'BiometricsSettings', key: '1'},
        {type: 'Dietary Restrictions', screen: 'DietaryRestrictionsSettings', key: '2'},
        {type: 'Goals', screen: 'GoalsSettings', key: '3'},
        {type: 'Account', screen: 'AccountSettings', key: '4'}
    ])

    return (
        <View style={globalStyles.coloredContainer}>
            <FlatList 
                data={settingTypes}
                renderItem={ ({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate(item.screen)}>
                        <View style={globalStyles.whiteItem}>
                            <Text style={globalStyles.text}>{item.type}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}