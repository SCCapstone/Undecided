// Screen that prompts the user to enter their email and reset their password
import React from "react";
import {View, StyleSheet, TextInput, Text, Button, Alert } from "react-native";
import { COLORS } from "../constants/colors";
import { globalStyles } from "../styles/global";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export default function RecoverPassword({ navigation }) {

    // Initialize state for user's email
    const [providedEmail, setProvidedEmail] = React.useState(null);

    // This function is called when the user enters their email
    const emailChangeHandler = (val) => {
        setProvidedEmail(val);
    }

    const pressHandler = () => {
        sendPasswordResetEmail(auth, providedEmail, null)
            .then(() => {
                Alert.alert("Success", "A link to reset your password has been sent to the email you provided.", [
                    {
                      text: "Ok",
                      onPress: () => {
                        navigation.goBack()
                      },
                    },
                  ]);
            })
            .catch(function (e) {
                alert("There was a problem attempting to reset your password.")
            });
    }

    // Rendering RecoverPassword component
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Please enter your email.</Text>
            <TextInput
                style={styles.inputField}
                editable={true}
                onChangeText={emailChangeHandler}
                value={providedEmail}
            />
            <Button title={"Change Password"}onPress={pressHandler} />
        </View>
    )
}

// Defining styles using StyleSheet
const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.green,
        flex: 1,
        padding: 48,
    },
    inputField: {
        padding: 5,
        paddingLeft: 35,
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 4
    },
    text: {
        color: "#464838",
        fontSize: 22,
        marginHorizontal: 50,
        marginTop: 20,
        marginBottom: 20,
        textAlign: "center",
        paddingLeft: 12
      },
})