import React, { useState, useEffect } from "react";
import { useTheme, useNavigation } from "@react-navigation/native";
import {
  useDeviceOrientation,
  useDimensions,
} from "@react-native-community/hooks";
import { isTablet, isPhone } from "react-native-device-detection";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";

export default function ActiveLinks() {
  const { colors, dark } = useTheme();
  const navigation = useNavigation();
  const dimensions = useDimensions();
  return (
    <SafeAreaView style={styles.container}>
      <Appbar style={{ width: "100%" }}>
        <Appbar.Action
          icon="menu"
          size={30}
          color={colors.accent}
          onPress={() => navigation.openDrawer()}
        />
        <Appbar.Content title="Active Links" titleStyle={{ fontSize: 16 }} />
      </Appbar>
      <Text>This is Active Links Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
