import React from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";

export default function OrderSuccess({ success }) {
  return (
    <SafeAreaView>
      <Text>Order Success Screen</Text>
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
