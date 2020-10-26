import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Success() {
  return (
    <View styles={styles.container}>
      <Text>This is Success Screen</Text>
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
