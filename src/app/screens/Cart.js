import React, { useState, useEffect } from "react";
import { useTheme, useNavigation } from "@react-navigation/native";
import { useDeviceOrientation, useDimensions } from "@react-native-community/hooks";
import { useStore } from "../config/Store";
import { isTablet, isPhone } from "react-native-device-detection";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView, View, Text, StyleSheet, FlatList } from "react-native";
import { Appbar } from "react-native-paper";
import { Button } from "react-native-elements";
import CartOrderItem from "../components/pure components/CartOrderItem";

export default function Cart() {
  const { colors, dark } = useTheme();
  const navigation = useNavigation();
  const dimensions = useDimensions();

  const { state, dispatch } = useStore();

  return (
    <SafeAreaView style={styles.container}>
      <Appbar style={{ width: "100%" }}>
        <Appbar.Action
          icon="menu"
          size={30}
          color={colors.accent}
          onPress={() => navigation.openDrawer()}
        />
        <Appbar.Content title="Cart" titleStyle={{ fontSize: 16 }} />
      </Appbar>
      <View style={{ flex: 1 }}>
        <FlatList
          style={styles.flatlist}
          data={state.data.cart}
          keyExtractor={(item) => item.skuNumber}
          renderItem={({ item }) => <CartOrderItem cart={item} />}
          contentContainerStyle={
            state.data.cart.length == 0 ? { flexGrow: 1, justifyContent: "center" } : {}
          }
          ListEmptyComponent={
            state.data.cart.length == 0 ? (
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "grey" }}>You currently have no items in your Cart</Text>
                <Text style={{ fontSize: 16 }}>Add items from Catalogue to show Here</Text>
                <Button
                  type="clear"
                  title="Products Catalogue"
                  titleStyle={{ color: colors.accent }}
                  onPress={() => navigation.navigate("catalogue")}
                />
              </View>
            ) : null
          }
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <Button
          icon={<Icon name="tag-heart" size={20} color={colors.accent} style={{ marginEnd: 3 }} />}
          titleStyle={{ color: colors.accent }}
          buttonStyle={{
            borderColor: colors.accent,
            marginStart: 5,
            marginEnd: 5,
            marginBottom: 10,
            height: 50,
            borderRadius: 10,
          }}
          containerStyle={{ flex: 1 }}
          type="outline"
          title="Generate Order"
          onPress={() => navigation.navigate("success")}
        />
        <Button
          icon={
            <Icon
              name="link-variant"
              size={20}
              color={colors.textInverse}
              style={{ marginEnd: 3 }}
            />
          }
          titleStyle={{ color: colors.textInverse }}
          buttonStyle={{
            backgroundColor: colors.accent,
            marginStart: 5,
            marginEnd: 5,
            marginBottom: 10,
            height: 50,
            borderRadius: 10,
          }}
          containerStyle={{ flex: 1 }}
          title="Generate Link"
          onPress={() => navigation.navigate("customers")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlist: {
    flex: 1,
    marginBottom: 15,
  },
});
