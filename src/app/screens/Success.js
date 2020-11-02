import React, { useCallback, useEffect } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { SafeAreaView, View, Text, StyleSheet, BackHandler } from "react-native";
import OrderSuccess from "../components/OrderSuccess";
import LinkSuccess from "../components/LinkSuccess";

export default function Success({ route }) {
  console.log("sucess props received", route.params);
  return route.params.feature == "order" ? (
    <OrderSuccess success={route.params.data} />
  ) : (
    <LinkSuccess success={route.params.data} />
  );
}
