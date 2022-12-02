import React from "react";
import google from "../assets/google.png";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as AppleAuthentication from "expo-apple-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import axios from "axios"

WebBrowser.maybeCompleteAuthSession();

export default function AutoAuth({ navigation: { navigate } }) {
  const url = "https://www.googleapis.com/oauth2/v2/userinfo";
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "954859485255-fcf95mh4mu72ef803r09mb7re2anmutq.apps.googleusercontent.com",
<<<<<<< HEAD
    iosClientId:
      "954859485255-gl8t79ltfon6jatru8ilaptnnrqtqbr2.apps.googleusercontent.com",
    /*androidClientId:
      """,*/
=======
    /*iosClientId:
      "",
    androidClientId:
      "",*/
>>>>>>> 5178a7717863eca96c3925863eaa52776eab7ed1
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      getGoogleUser({
        Authorization: `Bearer ${response.authentication.accessToken}`,
      });
    }
  }, [response]);

  const getGoogleUser = async (headers) => {
    try {
      let gUserReq = await axios.get(url, { headers });
      await setDoc(doc(db, "users", gUserReq.data.id), {
        signinType: "Google",
        uid: gUserReq.data.id,
        name: gUserReq.data.name,
        email: gUserReq.data.email,
      }).then(async () => {
        await AsyncStorage.setItem("token", response.authentication.accessToken);
        await AsyncStorage.setItem("uid", gUserReq.data.id);
        navigate("Home");
      });
    } catch (error) {
      alert(error);
    }
  };

  const handleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      console.log("credential", credential);
      await setDoc(doc(db, "users", credential.user), {
        signinType: "Apple",
        uid: credential.user,
        email: credential.email || "****",
        name: credential.fullName?.givenName || "****",
      }).then(async () => {
        await AsyncStorage.setItem("uid", credential.user);
        navigate("Home");
      });
    } catch (e) {
      alert(e);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.socialButton}
        onPress={() => navigate("auth")}
      >
        <Image
          source={{
            uri: "https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png",
          }}
          style={styles.socialIcon}
        />
        <Text style={styles.labelStyle}>Continue With Email</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => promptAsync()}
        style={styles.socialButton}
      >
        <Image source={google} style={styles.socialIcon} />
        <Text style={styles.labelStyle}>Continue With Google</Text>
      </TouchableOpacity>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        onPress={handleLogin}
        style={{ width: "80%", height: 44 }}
      />

      <Text style={styles.newUser} onPress={() => navigate("auth")}>
        Register a new user
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FE7B5F",
  },
  box: {
    height: 50,
    width: "90%",
    borderWidth: 1,
    borderRadius: 100,
    marginVertical: 10,
    borderColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
  labelStyle: {
    fontSize: 14,
    fontWeight: "600",
  },
  newUser: {
    fontSize: 16,
    marginTop: 20,
  },
  socialButton: {
    height: 50,
    width: "80%",
    borderWidth: 1,
    shadowRadius: 1,
    borderRadius: 5,
    marginBottom: 15,
    shadowOpacity: 1,
    alignItems: "center",
    borderStyle: "solid",
    flexDirection: "row",
    borderColor: "#F4F6F9",
    shadowColor: "gainsboro",
    justifyContent: "center",
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 0 },
  },
  socialIcon: {
    width: 16,
    height: 16,
    marginRight: 30,
  },
});

//Colors:
// yellow: "#FBF174"
// orange: "#FE7B5F"
// white
// blue: "#58C5CC"
// green: "#89E894"