import React, { useState, useEffect } from "react";
import { getAuth, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth"
import { View, FlatList, TouchableWithoutFeedback, Keyboard, Button } from "react-native";
import { globalStyles } from "../../styles/global";
import Setting from "../../components/Setting";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import * as dbConstants from "../../DatabaseConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AccountSettings({ navigation }) {
    
    const [settings, setSettings] = React.useState([
        {settingName: "First Name", dbField: dbConstants.FIRST_NAME, data: null, key: "1"},
        {settingName: "Last Name", dbField: dbConstants.LAST_NAME, data: null, key: "2"},
        {settingName: "Email", dbField: dbConstants.EMAIL, data: null, key: "3"},
        {settingName: "Password", dbField: dbConstants.PASSWORD, data: null, key: "4"},
        {settingName: "Phone Number", dbField: dbConstants.PHONE, data: null, key: "5"},
    ]);

    const [userDocSnap, setUserDocSnap] = useState(null);
    const [auth, setAuth] = useState(getAuth())

    useEffect(() => {
        getUserDocSnap();
    }, []);

    //necessary because user may update same setting during same session multiple times
    useEffect(() => {
        getUserDocSnap();
    }, [settings]);

    useEffect(() => {
        saveChangesHandler();
    }, [settings]);

    const getUserDocSnap = async () => {
        const uid = await AsyncStorage.getItem("uid");
        const docRef = doc(db, "users", uid);
        const snap = await getDoc(docRef);
        setUserDocSnap(snap);
    };

    const saveChangesHandler = async () => {
        const uid = await AsyncStorage.getItem("uid");
        const userDocRef = doc(db, "users", uid);

        if (settings[2].data != null && !/^\S+@\S+\.\S+$/.test(settings[2].data)) {
            alert("Changes to your email were not saved. Please enter a valid email address.");
            return;
        }

        if (settings[3].data != null && settings[3].data.length < 6) {
            alert("Changes to your password were not saved. Please enter at least six characters.")
            return;
        }
        
        if (settings[2].data != null && settings[3].data != null) {
            await handleEmailChange(settings[2].data);
            await handlePasswordChange(settings[3].data);
        } else if (settings[2].data != null) {
            await handleEmailChange(settings[2].data);
        } else if (settings[3].data != null) {
            await handlePasswordChange(settings[3].data);
        }

        settings.forEach(async element => {
            if (element.data != null) {
                await updateDoc(userDocRef, {
                    [element.dbField]: element.data
                });

                //set data to null to allow future capture of changes
                element.data = null;
            }
        });

        //handle email and password sequentially
    }

    const handleEmailChange = async (newEmail) => {
        //refresh userDocSnap to ensure up-to-date info
        const email = userDocSnap.get(dbConstants.EMAIL)
        console.log(email)
        const password = userDocSnap.get(dbConstants.PASSWORD)

        const credential = EmailAuthProvider.credential(email, password)
        console.log("Obtained credential: " + credential)

        signInWithEmailAndPassword(auth, email, password).then( (user) => {
            console.log("signed in successfully")
            reauthenticateWithCredential(auth.currentUser, credential).then(() => {
            //update email
            console.log("attempting email update to " + newEmail)
            updateEmail(auth.currentUser, newEmail).catch((error) => {
                console.log("Email update failed after reauthentication attempt.")
            })}
        )})
    }

    const handlePasswordChange = async (newPassword) => {
        const email = userDocSnap.get(dbConstants.EMAIL)
        const password = userDocSnap.get(dbConstants.PASSWORD)

            const credential = EmailAuthProvider.credential(email, password)
            console.log("Obtained credential: " + credential)

            signInWithEmailAndPassword(auth, email, password).then( (user) => {
                console.log("signed in successfully")
                reauthenticateWithCredential(auth.currentUser, credential).then(() => {
                //update email
                console.log("attempting password update to " + newPassword)
                updatePassword(auth.currentUser, newPassword).catch((error) => {
                    console.log("Password update failed after reauthentication attempt.")
                })}
            )})
    }

    const handleCallback = (item, newData) => {
        const newSettings = [...settings];
        const index = newSettings.indexOf(item);
        const newItem = { ...item };
        newItem.data = newData;
        newSettings[index] = newItem;
        setSettings(newSettings);
    }

    return (
        <View style={globalStyles.container}>
            {userDocSnap && (<FlatList
                data={settings}
                renderItem={({ item }) => (
                <Setting item={item} initialData={userDocSnap.get(item.dbField)} parentCallback = {handleCallback}/>
                )}
                />)}
        </View>
    );
}