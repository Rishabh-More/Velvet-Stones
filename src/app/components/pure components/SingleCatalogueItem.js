import React, { useState } from "react";
import { isPhone } from "react-native-device-detection";
import { useDeviceOrientation } from "@react-native-community/hooks";
import { useTheme } from "@react-navigation/native";
import { useStore } from "../../config/Store";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Card, Title } from "react-native-paper";
import { Button } from "react-native-elements";
import ImageView from "react-native-image-viewing";
import Toast from "react-native-simple-toast";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const tabImageThumbHeight = "60%";
const phoneImageThumbHeight = "55%";

const SingleCatalogueItem = ({ product }) => {
  const orientation = useDeviceOrientation();
  const { colors, dark } = useTheme();

  //State Code
  const { state, dispatch } = useStore();
  const [visible, setIsVisible] = useState(false);

  async function AddProductToCart() {
    //Check if item exists in cart or not
    let found = await state.data.cart.find((item) => item.skuNumber == product.skuNumber);
    console.log("did found item", found);
    if (found != null) {
      //Item already exists in array
      Toast.show("Item is already added to Cart", Toast.LONG);
    } else {
      //Item does not exist in Cart. Add to it
      await dispatch({ type: "ADD_TO_CART", payload: product });
    }
  }

  return (
    <Card
      style={[
        styles.container,
        isPhone
          ? { aspectRatio: orientation.portrait ? 1 : 1 }
          : { aspectRatio: orientation.portrait ? 0.9 : 0.95 },
      ]}>
      <TouchableOpacity style={{ flex: 2 }} onPress={() => setIsVisible(true)}>
        <Image
          style={styles.image}
          source={
            product.imageUrl == ""
              ? require("../../res/assets/broken-image.png")
              : { uri: product.imageUrl }
          }
        />
        <ImageView
          images={[{ uri: product.imageUrl }]}
          imageIndex={0}
          visible={visible}
          backgroundColor={colors.background}
          onRequestClose={() => setIsVisible(false)}
        />
      </TouchableOpacity>
      <Title style={[styles.title, { color: colors.accent }]}>{product.skuNumber}</Title>
      <View style={styles.content}>
        {/* <View>
          <Text style={[styles.text, { color: colors.textSubtle }]}>
            <Text style={{ fontWeight: "bold", color: colors.textSubtle }}>Item Category: </Text>
            {product.itemCategory}
          </Text>
        </View> */}
        <View style={styles.info}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}>
              <Text style={[styles.text, { flex: 1, color: colors.textSubtle }]}>
                <Text style={{ fontWeight: "bold" }}>G Wt: </Text>
                {product.grossWeight}
              </Text>
              <Text style={[styles.text, { flex: 1, color: colors.textSubtle }]}>
                <Text style={{ fontWeight: "bold" }}>{product.metalPurity} Kt</Text>
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}>
              <Text style={[styles.text, { flex: 1, color: colors.textSubtle }]}>
                <Text style={{ fontWeight: "bold" }}>N Wt: </Text>
                {product.netWeight}
              </Text>
              <Text style={[styles.text, { flex: 1, color: colors.textSubtle }]}>
                <Text style={{ fontWeight: "bold" }}>{product.metalType}</Text>
              </Text>
            </View>
            {product.totalDiamondWeight != "" ? (
              <Text style={[styles.text, { color: colors.textSubtle }]}>
                <Text style={{ fontWeight: "bold", color: colors.textSubtle }}>D Wt: </Text>
                {product.totalDiamondWeight} Cts
              </Text>
            ) : null}
            {/* <Text style={{ marginLeft: 5, fontWeight: "bold", color: colors.textSubtle }}>
              Item Status:{" "}
              <Text
                style={{
                  color: product.itemStatus == "INSTOCK" ? colors.accent : "grey",
                }}>
                {product.itemStatus}
              </Text>
            </Text> */}
          </View>
          <View style={styles.button}>
            <Button
              type="outline"
              icon={<Icon name="cart-outline" size={20} color={colors.accent} />}
              buttonStyle={{ borderColor: colors.accent }}
              containerStyle={{ margin: 5, marginBottom: 5, width: 50 }}
              onPress={() => AddProductToCart()}
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
    borderRadius: 10,
    elevation: 3,
  },
  content: {
    flex: 1,
    margin: 5,
  },
  info: {
    flex: 1,
    flexDirection: "row",
  },
  title: {
    marginStart: 10,
    marginEnd: 10,
  },
  text: {
    //flex: 1,
    marginLeft: 5,
  },
  image: {
    margin: 3,
    marginBottom: 5,
    borderRadius: 10,
    maxWidth: "100%",
    height: "100%", //isPhone ? phoneImageThumbHeight : tabImageThumbHeight,
    resizeMode: "cover",
  },
  button: {
    flexDirection: "column-reverse",
    alignItems: "flex-end",
  },
});

export default SingleCatalogueItem;
