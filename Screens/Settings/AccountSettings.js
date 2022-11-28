import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../../styles/global";

export default function AccountSettings({ navigation }) {
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.paragraph}>Welcome to AccountSettings</Text>
        </View>
    );
}