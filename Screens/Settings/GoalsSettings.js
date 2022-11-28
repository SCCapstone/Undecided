import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../../styles/global";

export default function GoalsSettings({ navigation }) {
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.paragraph}>Welcome to GoalsSettings</Text>
        </View>
    );
}