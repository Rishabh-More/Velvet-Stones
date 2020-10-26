import React, { useState, useEffect } from "react";
import { useStore } from "../config/Store";
import { useTheme, useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { Title } from "react-native-paper";
import { Button, Overlay } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export function CatalogueCartFooter() {
  const { colors, dark } = useTheme();
  const navigation = useNavigation();

  //State Code
  const { state, dispatch } = useStore();
  const [visible, setVisible] = useState(false);

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
            marginEnd: 15,
            borderRadius: 25,
          }}
          buttonStyle={{ height: 50 }}
          linearGradientProps={{
            colors: [colors.accent, colors.accentLight],
            start: { x: 1, y: 1 },
            end: { x: 1, y: 0 },
          }}
          onPress={() => setVisible(true)}
        />
      </View>
      <Overlay
        title="Select Action"
        isVisible={visible}
        overlayStyle={{ borderRadius: 15, backgroundColor: colors.modal }}
        onBackdropPress={() => setVisible(false)}>
        <View style={{ margin: 5 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="cart-outline" size={24} color={colors.accent} style={{ marginStart: 5 }} />
            <Title style={{ marginStart: 5, marginEnd: 5, marginTop: 5, marginBottom: 5 }}>
              Checkout Items
            </Title>
          </View>
          <Text
            style={{
              marginStart: 10,
              marginEnd: 10,
              marginTop: 5,
              marginBottom: 5,
              color: colors.text,
            }}>
            How would you like to checkout to Cart?
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Button
              icon={
                <Icon
                  name="tag-heart"
                  size={20}
                  color={dark ? colors.modal : colors.textInverse}
                  style={{ marginEnd: 3 }}
                />
              }
              titleStyle={{ color: dark ? colors.modal : colors.textInverse }}
              buttonStyle={{
                backgroundColor: colors.accent,
                marginStart: 5,
                marginEnd: 5,
                marginBottom: 10,
                marginTop: 10,
                //height: 50,
                borderRadius: 10,
              }}
              title="Generate Order"
              onPress={async () => {
                await dispatch({ type: "SERVE_FEATURE_REQUEST", payload: "order" });
                setVisible(false);
                navigation.navigate("Cart");
              }}
            />
            <Button
              icon={
                <Icon
                  name="link-variant"
                  size={20}
                  color={colors.accent}
                  style={{ marginEnd: 3 }}
                />
              }
              titleStyle={{ color: colors.accent }}
              buttonStyle={{
                borderColor: colors.accent,
                marginStart: 5,
                marginEnd: 5,
                marginBottom: 10,
                marginTop: 10,
                //height: 50,
                borderRadius: 10,
              }}
              type="outline"
              title="Generate Link"
              onPress={async () => {
                await dispatch({ type: "SERVE_FEATURE_REQUEST", payload: "link" });
                setVisible(false);
                navigation.navigate("Cart");
              }}
            />
          </View>
        </View>
      </Overlay>
    </View>
  );
}
