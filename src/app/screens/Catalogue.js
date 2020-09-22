import React, { useState, useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import {
  useDeviceOrientation,
  useDimensions,
} from "@react-native-community/hooks";
import { isTablet, isPhone } from "react-native-device-detection";
import { SafeAreaView, View, Text, StyleSheet, StatusBar } from "react-native";
import { CatalogueCustomHeader } from "../components/CatalogueCustomHeader";

export default function Catalogue() {
  const { colors, dark } = useTheme();
  const dimensions = useDimensions();
  console.log("screen dimensions", dimensions);
  return (
    <SafeAreaView style={styles.container}>
      <CatalogueCustomHeader />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
