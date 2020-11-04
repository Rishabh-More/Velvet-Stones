import React, { useState, useEffect } from "react";
import { useDeviceOrientation } from "@react-native-community/hooks";
import { isTablet, isPhone } from "react-native-device-detection";
import { useTheme, useNavigation } from "@react-navigation/native";
import { SafeAreaView, View, Text, StyleSheet, ScrollView, ImageBackground } from "react-native";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
import { Title, Subheading, TextInput, HelperText } from "react-native-paper";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Login() {
  const navigation = useNavigation();
  const orientation = useDeviceOrientation();
  const { colors, dark } = useTheme();
  const [secureEntry, setSecureEntry] = useState(true);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    license: false,
    device: false,
  });
  console.log("orientation is", orientation);
  //console.log("errors", errors);
  const onChangeText = (text) => hasErrors(text);

  const displayPassword = () => {
    setSecureEntry(!secureEntry);
  };

  const hasErrors = (text) => {
    // if (text.length == 0) {
    //   setErrors({ email: false });
    // } else if (text.includes("@")) {
    //   setErrors({ email: false });
    // } else {
    //   setErrors({ email: true });
    // }
  };

  function LoginContent() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: isTablet ? "row" : "column",
            backgroundColor: "white",
          }}>
          {/**For Email & Password */}
          <View style={{ flex: 1, justifyContent: "center", margin: 5 }}>
            <TextInput
              mode="outlined"
              label="Email Address"
              theme={{
                colors: {
                  placeholder: colors.accent,
                  primary: colors.accent,
                  error: "red",
                },
              }}
              style={{ marginStart: isTablet ? 20 : 5, marginEnd: isTablet ? 20 : 5 }}
            />
            <HelperText
              visible={true}
              type="error"
              theme={{ colors: { error: "red" } }}
              style={{ marginStart: isTablet ? 15 : 5 }}>
              Invalid Email Address
            </HelperText>
          </View>
          <View style={{ flex: 1, justifyContent: "center", margin: 5 }}>
            <TextInput
              mode="outlined"
              label="Password"
              theme={{
                colors: {
                  placeholder: colors.accent,
                  primary: colors.accent,
                  error: "red",
                },
              }}
              style={{ marginStart: isTablet ? 20 : 5, marginEnd: isTablet ? 20 : 5 }}
            />
            <HelperText
              visible={true}
              type="error"
              theme={{ colors: { error: "red" } }}
              style={{ marginStart: isTablet ? 15 : 5 }}>
              Invalid Password
            </HelperText>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: isTablet ? "row" : "column",
            backgroundColor: "white",
          }}>
          {/**For License Key and Device Name */}
          <View style={{ flex: 1, justifyContent: "center", margin: 5 }}>
            <TextInput
              mode="outlined"
              label="License Key"
              theme={{
                colors: {
                  placeholder: colors.accent,
                  primary: colors.accent,
                  error: "red",
                },
              }}
              style={{ marginStart: isTablet ? 20 : 5, marginEnd: isTablet ? 20 : 5 }}
            />
            <HelperText
              visible={true}
              type="error"
              theme={{ colors: { error: "red" } }}
              style={{ marginStart: isTablet ? 15 : 5 }}>
              Invalid License Key
            </HelperText>
          </View>
          <View style={{ flex: 1, justifyContent: "center", margin: 5 }}>
            <TextInput
              mode="outlined"
              label="Device Info"
              theme={{
                colors: {
                  placeholder: colors.accent,
                  primary: colors.accent,
                  error: "red",
                },
              }}
              style={{ marginStart: isTablet ? 20 : 5, marginEnd: isTablet ? 20 : 5 }}
            />
            <HelperText
              visible={true}
              type="error"
              theme={{ colors: { error: "red" } }}
              style={{ marginStart: isTablet ? 15 : 5 }}>
              Device Name Must not be empty
            </HelperText>
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          flexDirection: isTablet && orientation.landscape ? "row" : "column",
          backgroundColor: colors.accent,
        },
      ]}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}></View>
      <View style={{ flex: isTablet ? 1.5 : 3 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            margin: "5%",
            marginTop: isTablet && orientation.landscape ? "15%" : "5%",
            marginBottom: isTablet && orientation.landscape ? "15%" : "5%",
            borderRadius: 25,
            backgroundColor: "white",
          }}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            {/**For Title & Header */}
            <View style={{ marginStart: isTablet ? 25 : 15 }}>
              <Title>Welcome User</Title>
              <Subheading>Please Sign In to Continue</Subheading>
            </View>
          </View>
          <View style={{ flex: isTablet ? 3 : 5 }}>
            {/**For Main Content */}
            {isTablet ? (
              <View style={{ flex: 1, backgroundColor: "green" }}>{LoginContent()}</View>
            ) : (
              <ScrollView style={{ flex: 1 }}>{LoginContent()}</ScrollView>
            )}
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            {/**For Login Button */}
            <Button
              title="Login"
              loading={false}
              containerStyle={{
                maxWidth: isTablet ? "45%" : "100%",
                marginStart: isTablet ? 25 : 10,
                marginEnd: isTablet ? 25 : 10,
              }}
              buttonStyle={{ height: 50, borderRadius: 10 }}
              linearGradientProps={{
                colors: [colors.accent, colors.accentLight],
                start: { x: 1, y: 1 },
                end: { x: 1, y: 0 },
              }}
              onPress={() => navigation.navigate("verify")}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
