import React from "react";
import google from "../assets/google.png";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import axios from "axios"
import { COLORS } from '../constants/colors.js'

WebBrowser.maybeCompleteAuthSession();

export default function AutoAuth({ navigation: { navigate } }) {
  const url = "https://www.googleapis.com/oauth2/v2/userinfo";
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "412107851455-k47tmphid1iep6p5olco4pc9u0dkqlub.apps.googleusercontent.com",
    androidClientId:
    "412107851455-k47tmphid1iep6p5olco4pc9u0dkqlub.apps.googleusercontent.com",
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
    //justifyContent: "center",
    backgroundColor: COLORS.green,
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
    borderRadius: 8,
    marginBottom: 15,
    shadowOpacity: 1,
    alignItems: "center",
    borderStyle: "solid",
    flexDirection: "row",
    borderColor: "black",
    shadowColor: "gainsboro",
    justifyContent: "center",
    backgroundColor: "#F1E2CA",
    shadowOffset: { width: 0, height: 0 },
  },
  socialIcon: {
    width: 16,
    height: 16,
    marginRight: 30,
  },
  logo: {
    marginTop: 70,
    marginBottom: 70,
  },
});