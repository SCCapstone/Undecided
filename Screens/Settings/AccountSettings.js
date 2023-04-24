//A screen to represent the user's current settings for their account.

import React, { useState, useEffect } from "react";
import { getAuth, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider, signInWithEmailAndPassword } from "firebase/auth"
import { View, FlatList, TouchableWithoutFeedback, Keyboard, Button } from "react-native";
import { globalStyles } from "../../styles/global";
import Setting from "../../components/Setting";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import * as dbConstants from "../../DatabaseConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AccountSettings({ navigation }) {
    
    //An array of settings objects to represent the settings to display on the screen.
    const [settings, setSettings] = React.useState([
        {settingName: "First Name", dbField: dbConstants.FIRST_NAME, data: null, key: "1"},
        {settingName: "Last Name", dbField: dbConstants.LAST_NAME, data: null, key: "2"},
        {settingName: "Email", dbField: dbConstants.EMAIL, data: null, key: "3"},
        {settingName: "Password", dbField: dbConstants.PASSWORD, data: null, key: "4"},
    ]);

    //A state variable to represent this user's document snapshot as it exists in Firebase.
    const [userDocSnap, setUserDocSnap] = useState(null);

    //A state variable to hold this app's auth instance.
    const [auth, setAuth] = useState(getAuth())

    //Ensure an up-to-date version of the user's document snapshot is held after each render of this component.
    useEffect(() => {
        getUserDocSnap();
    }, []);

    //Whenever the user changes their settings, refresh their document snapshot to ensure the data is accurate.
    //This is necessary because user may update same setting during same session multiple times
    useEffect(() => {
        getUserDocSnap();
    }, [settings]);

    //Observe the settings object and save changes each time an edit is detected.
    //Allows for automatic saving.
    useEffect(() => {
        saveChangesHandler();
    }, [settings]);

    //Retrieve the current user's document snapshot from Firebase.
    const getUserDocSnap = async () => {
        const uid = await AsyncStorage.getItem("uid");
        const docRef = doc(db, "users", uid);
        const snap = await getDoc(docRef);
        setUserDocSnap(snap);
    };

    //Handles saving the settings displayed on this screen to Firebase.
    const saveChangesHandler = async () => {

        //Check if the email setting is null. If not, i.e., it has been changed, check that it's valid.
        if (settings[2].data != null && !/^\S+@\S+\.\S+$/.test(settings[2].data)) {
                alert("Changes to your email were not saved. Please enter a valid email address.");
                return;
            }

        //Check if the password setting is null. If not, i.e., it has been changed, check that it's valid.
        if (settings[3].data != null && settings[3].data.length < 6) {
            alert("Changes to your password were not saved. Please enter at least six characters.")
            return;
        }

        
        //Check if email or password have been changed. These require special care to reconcile them with Firebase Authenticator.
        //If so, then call their respective methods to change them.
        //If not, then call saveSettingsToFirestore() to save all non-sensitive settings to firestore.
        if (settings[2].data != null) {
            await handleEmailChange(settings[2].data).then(saveSettingsToFirestore());
        } else if (settings[3].data != null) {
            await handlePasswordChange(settings[3].data).then(saveSettingsToFirestore());
        } else {
            saveSettingsToFirestore();
        }
    }

    //Take all settings objects stored in state and change their respective Firestore entries.
    const saveSettingsToFirestore = async () => {
        const uid = await AsyncStorage.getItem("uid");
        const userDocRef = doc(db, "users", uid);

        //For each element whose data is not null, update its respective Firestore field.
        settings.forEach(async element => {
            if (element.data != null) {
                await updateDoc(userDocRef, {
                    [element.dbField]: element.data
                });

                //set data to null to allow future capture of changes
                element.data = null;
            }
        });
    }

    //Handles change of user email.
    const handleEmailChange = async (newEmail) => {
        //Get the user's current email and password.
        const email = userDocSnap.get(dbConstants.EMAIL)
        const password = userDocSnap.get(dbConstants.PASSWORD)

        //Create a credential object with the user's email and password.
        const credential = EmailAuthProvider.credential(email, password)
        console.log("Obtained credential: " + credential)

        //Sign the user in with their email and password to ensure they are recently signed in.
        signInWithEmailAndPassword(auth, email, password).then( (user) => {
            console.log("signed in successfully")
            //Reauthenticate the user with the credential object to allow changing of sensitive information (email, password).
            reauthenticateWithCredential(auth.currentUser, credential).then(() => {

            //Update the user's email, and catch the error if it fails.
            console.log("attempting email update to " + newEmail)
            updateEmail(auth.currentUser, newEmail).catch((error) => {
                console.log("Email update failed after reauthentication attempt.")
            })}
        )})
    }

    //Handles change of user password.
    const handlePasswordChange = async (newPassword) => {
        //Get the user's current email and password.
        const email = userDocSnap.get(dbConstants.EMAIL)
        const password = userDocSnap.get(dbConstants.PASSWORD)

        //Create a credential object with the user's email and password.
        const credential = EmailAuthProvider.credential(email, password)
        console.log("Obtained credential: " + credential)

        //Sign the user in with their email and password to ensure they are recently signed in.
        signInWithEmailAndPassword(auth, email, password).then( (user) => {
            console.log("signed in successfully")
            //Reauthenticate the user with the credential object to allow changing of sensitive information (email, password).
            reauthenticateWithCredential(auth.currentUser, credential).then(() => {
            //Update the user's password, and catch the error if it fails.
            console.log("attempting password update to " + newPassword)
            updatePassword(auth.currentUser, newPassword).catch((error) => {
                console.log("Password update failed after reauthentication attempt.")
            })}
        )})
    }

    //This callback is passed to child setting components to update the settings objects stored in this screen's State.
    const handleCallback = (item, newData) => {
        const newSettings = [...settings];
        const index = newSettings.indexOf(item);
        const newItem = { ...item };
        newItem.data = newData;
        newSettings[index] = newItem;
        setSettings(newSettings);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={globalStyles.coloredContainer}>
                {userDocSnap && (<FlatList
                    data={settings}
                    renderItem={({ item }) => (
                    <Setting item={item} initialData={userDocSnap.get(item.dbField)} parentCallback = {handleCallback}/>
                    )}
                    />)}
            </View>
        </TouchableWithoutFeedback>
    );
}