import React, { useState, useEffect } from "react";
import useDeviceOrientation from "@react-native-community/hooks";
import { isTablet, isPhone } from "react-native-device-detection";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";

export default function Login() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>This is Login Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
