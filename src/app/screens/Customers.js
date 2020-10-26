import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Customers() {
  return (
    <View styles={styles.container}>
      <Text>This is Customers Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
