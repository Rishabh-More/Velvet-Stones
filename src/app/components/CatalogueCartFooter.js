import React, { useState, useEffect } from "react";
import { useStore } from "../config/Store";
import { useTheme, useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export function CatalogueCartFooter() {
  const { colors, dark } = useTheme();
  const navigation = useNavigation();

  //State Code
  const { state, dispatch } = useStore();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
      }}>
      <View style={{ flex: 4, alignItems: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#fff" }}>
          Items Added to Cart: {state.data.cart.length}
        </Text>
      </View>
      <View
        style={{
          flex: 3,
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
          marginBottom: 10,
        }}>
        <Button
          icon={<Icon name="delete-sweep-outline" size={24} color={colors.accent} />}
          buttonStyle={{ height: 50, width: 50, backgroundColor: "#fff", borderRadius: 25 }}
          onPress={() => dispatch({ type: "CLEAR_CART" })}
        />
        <Button
          title="Checkout"
          containerStyle={{
            flex: 1,
            margin: 10,
            marginStart: 5,
            marginEnd: 5,
            borderRadius: 25,
          }}
          buttonStyle={{ height: 50 }}
          linearGradientProps={{
            colors: [colors.accent, colors.accentLight],
            start: { x: 1, y: 1 },
            end: { x: 1, y: 0 },
          }}
        />
      </View>
    </View>
  );
}
