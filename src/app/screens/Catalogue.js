import React, { useState, useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import {
  useDeviceOrientation,
  useDimensions,
} from "@react-native-community/hooks";
import { isTablet, isPhone } from "react-native-device-detection";
import { SafeAreaView, View, Text, StyleSheet, FlatList } from "react-native";
import { CatalogueCustomHeader } from "../components/CatalogueCustomHeader";
import { BarIndicator } from "react-native-indicators";

export default function Catalogue() {
  const { colors, dark } = useTheme();
  const dimensions = useDimensions();
  console.log("screen dimensions", dimensions);
  return (
    <SafeAreaView style={styles.container}>
      <CatalogueCustomHeader />
      <FlatList onViewableItemsChanged />
      <View style={{ width: "100%", flex: 1 }}>
        <View
          style={{
            flex: 1,
            position: "absolute",
            opacity: 0.9,
            backgroundColor: colors.primary,
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: colors.text }}>
            Please Wait, Updating List...
          </Text>
          <BarIndicator
            size={30}
            count={5}
            color={colors.accent}
            style={{ maxHeight: 75 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
