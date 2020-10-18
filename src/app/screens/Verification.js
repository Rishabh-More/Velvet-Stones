import React, { useState, useEffect } from "react";
import useDeviceOrientation from "@react-native-community/hooks";
import { useTheme, useNavigation } from "@react-navigation/native";
import { isTablet, isPhone } from "react-native-device-detection";
import { SafeAreaView, View, Text, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-elements";
import OTPTextView from "react-native-otp-textinput";

export default function Verification() {
  const navigation = useNavigation();
  const [pending, setPending] = useState(true);
  const { colors, dark } = useTheme();

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (nav) => {
        if (!pending) {
          return;
        }

        nav.preventDefault();

        Alert.alert(
          "Sure you want to leave?",
          "You haven't verified your otp yet. Would you like to resend a new otp or leave?",
          [
            {
              text: "Leave",
              style: "destructive",
              onPress: () => {
                navigation.dispatch(nav.data.action);
              },
            },
            { text: "Resend OTP", style: "cancel" },
          ]
        );
      }),
    [navigation]
  );
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.accentDark }]}>
      <View style={{ flex: 1 }} />
      <View style={{ flex: 5 }}>
        <Text style={{ color: colors.textInverse, alignSelf: "center" }}>
          OTP has been sent to your registered email address.
        </Text>
        <Text
          style={{
            color: colors.textInverse,
            fontSize: 24,
            fontWeight: "900",
            alignSelf: "center",
            marginTop: 30,
            margin: 15,
          }}>
          Please Enter a valid OTP
        </Text>
        <OTPTextView
          keyboardType="numeric"
          inputCount={4}
          inputCellLength={1}
          tintColor={colors.accentLight}
          offTintColor={colors.accentLight}
          containerStyle={{ marginStart: 15, marginEnd: 15, justifyContent: "center" }}
          textInputStyle={{ borderRadius: 15, borderWidth: 3, alignSelf: "center", color: colors.textInverse }}
          handleTextChange={(text) => {
            console.log("otp entered", text);
          }}
        />
        <Button
          title="Verify OTP"
          loading={false}
          containerStyle={{ marginTop: 30, width: "75%", alignSelf: "center" }}
          buttonStyle={{ height: 50, margin: 10, borderRadius: 15 }}
          linearGradientProps={{
            colors: [colors.accent, colors.accentLight],
            start: { x: 1, y: 1 },
            end: { x: 1, y: 0 },
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    //alignItems: "center",
  },
});
