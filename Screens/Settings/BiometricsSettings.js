import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../../styles/global";

export default function BiometricsSettings({ navigation }) {
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.paragraph}>Welcome to BiometricsSettings</Text>
        </View>
    );
}