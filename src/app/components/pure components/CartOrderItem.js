import React from "react";
import { useTheme } from "@react-navigation/native";
import { View, Text, StyleSheet, Image } from "react-native";
import { Card, Title, TextInput } from "react-native-paper";
import { Button } from "react-native-elements";
import Counter from "react-native-counters";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CartOrderItem = ({ cart }) => {
  const { colors, dark } = useTheme();
  return (
    <Card style={styles.container}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View
          style={{
            flex: 1.5,
          }}>
          <View
            style={{ margin: 5, borderRadius: 10, borderWidth: 0.5, borderColor: colors.accent }}>
            <Image
              style={{
                flex: 1,
                borderRadius: 10,
                maxWidth: "100%",
                aspectRatio: 1,
                resizeMode: "cover",
                backgroundColor: "red",
              }}
              source={
                cart.imageUrl == ""
                  ? require("../../res/assets/broken-image.png")
                  : { uri: cart.imageUrl }
              }
            />
          </View>
          <View style={{ alignSelf: "center" }}>
            <Title>{cart.skuNumber}</Title>
          </View>
        </View>
        <View style={{ flex: 3 }}>
          <View style={{ flexDirection: "row", zIndex: 1 }}>
            <DropDownPicker
              disabled={false}
              placeholder="Select Purity"
              style={{ borderColor: colors.border, backgroundColor: colors.primary }}
              labelStyle={{ color: colors.text }}
              arrowColor={colors.text}
              containerStyle={{ flex: 1, margin: 5 }}
              dropDownStyle={{ backgroundColor: colors.primary, borderColor: colors.border }}
              items={[
                { label: "14 Kt", value: "14KT" },
                { label: "18 Kt", value: "18KT" },
              ]}
            />
            <DropDownPicker
              disabled={false}
              placeholder="Select Color"
              style={{ borderColor: colors.border, backgroundColor: colors.primary }}
              labelStyle={{ color: colors.text }}
              arrowColor={colors.text}
              containerStyle={{ flex: 1, margin: 5 }}
              dropDownStyle={{ backgroundColor: colors.primary, borderColor: colors.border }}
              items={[
                { label: "Yg", value: "Yg" },
                { label: "Wg", value: "Wg" },
                { label: "Pg", value: "Pg" },
                { label: "Yw", value: "Yw" },
                { label: "Pw", value: "Pw" },
                { label: "Gw", value: "Gw" },
                { label: "Pa", value: "Pa" },
              ]}
            />
          </View>
          <View style={{ margin: 5 }}>
            <TextInput
              label="Remarks"
              disabled={false}
              placeholder="Type some Remarks"
              underlineColor={colors.accent}
              style={{ borderRadius: 5 }}
              theme={{ colors: { primary: colors.accent, background: colors.card } }}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              margin: 5,
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <Counter
              start={1}
              min={1}
              max={5}
              buttonStyle={{
                margin: 5,
                borderColor: colors.accent,
                borderRadius: 10,
                borderWidth: 1.5,
              }}
              buttonTextStyle={{ color: colors.accent }}
              countTextStyle={{ color: colors.accent }}
              onChange={(value) => console.log("quantity", value)}
            />
            <Button
              type="outline"
              icon={<Icon name="trash-can-outline" size={24} color={colors.accent} />}
              buttonStyle={{
                margin: 5,
                alignSelf: "flex-end",
                borderColor: colors.accent,
                borderRadius: 5,
                borderWidth: 0.5,
              }}
            />
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    borderRadius: 15,
    elevation: 3,
  },
});

export default CartOrderItem;
