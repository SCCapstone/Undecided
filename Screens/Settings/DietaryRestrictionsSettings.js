import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../../styles/global";

export default function DietaryRestrictionsSettings({ navigation }) {
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.paragraph}>Welcome to DietaryRestrictionsSettings</Text>
        </View>
    );
}