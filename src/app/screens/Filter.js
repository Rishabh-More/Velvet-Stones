import React, { useState, useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import {
  useDeviceOrientation,
  useDimensions,
} from "@react-native-community/hooks";
import { isTablet, isPhone } from "react-native-device-detection";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";

export default function Filter() {
  const { colors, dark } = useTheme();
  const dimensions = useDimensions();
  return (
    <SafeAreaView style={styles.container}>
      <Text>This is the Filter Modal</Text>
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
