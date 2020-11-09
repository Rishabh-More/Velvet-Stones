import React, { useState, useEffect } from "react";
import { useTheme, useNavigation } from "@react-navigation/native";
import { useStore } from "../config/Store";
import { useDeviceOrientation, useDimensions } from "@react-native-community/hooks";
import { isTablet, isPhone } from "react-native-device-detection";
import { SafeAreaView, ScrollView, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Card, Title, Subheading } from "react-native-paper";
import { Button } from "react-native-elements";
import ImageView from "react-native-image-viewing";
import Toast from "react-native-simple-toast";

export default function ProductDetails({ route }) {
  const product = route.params;
  console.log("product details", product);
  const { colors, dark } = useTheme();
  const orientation = useDeviceOrientation();
  const navigation = useNavigation();
  const dimensions = useDimensions();

  //State Codes
  const [visible, setIsVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { state, dispatch } = useStore();

  useEffect(() => {
    navigation.setOptions({ title: product.skuNumber });
  }, []);

  useEffect(() => {
    let found = state.data.cart.find((item) => item.skuNumber == product.skuNumber);
    if (found != null) {
      //Product exists in cart
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [state.data.cart.length]);

  async function AddProductToCart() {
    const { shopId, createdAt, updatedAt, ...rest } = product;
    //console.log("original product", product);
    console.log("cart object now", rest);
    //Check if item exists in cart or not
    let found = await state.data.cart.find((item) => item.skuNumber == product.skuNumber);
    console.log("did found item", found);
    if (found != null) {
      //Item already exists in array
      Toast.show("Item is already added to Cart", Toast.LONG);
    } else {
      //Item does not exist in Cart. Add to it
      await dispatch({ type: "ADD_TO_CART", payload: rest });
    }
  }

  function Heading({ style, title, value }) {
    return (
      <View style={[{ flexDirection: "row", alignItems: "center", margin: 10 }, style]}>
        <Subheading>{title} </Subheading>
        <Title style={{ color: colors.accent }}>{value}</Title>
      </View>
    );
  }

  function Wrapper({ style, children }) {
    return <View style={[{ marginStart: 10, marginEnd: 10 }, style]}>{children}</View>;
  }

  function Info({ title, value }) {
    return (
      <View style={{ flexDirection: "row" }}>
        <Subheading>{title} </Subheading>
        <Subheading style={{ fontWeight: "bold" }}>{value != "" ? value : "N/A"}</Subheading>
      </View>
    );
  }

  function AddToCartButton() {
    return (
      <View>
        <Button
          title="Add to Cart"
          disabled={disabled}
          buttonStyle={{
            height: 50,
            width: "100%",
            alignSelf: "center",
            backgroundColor: colors.accent,
            borderRadius: 15,
          }}
          containerStyle={{ margin: 10 }}
          onPress={() => AddProductToCart()}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          flexDirection: isTablet && orientation.landscape ? "row" : "column",
        }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => setIsVisible(true)}>
            <Image
              style={{ maxWidth: "100%", height: "100%", resizeMode: "cover" }}
              source={
                product.imageUrl != ""
                  ? { uri: product.imageUrl }
                  : require("../res/assets/broken-image.png")
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
        </View>
        <View style={{ flex: isTablet && orientation.landscape ? 1 : 2 }}>
          <ScrollView>
            <Card style={{ margin: 10, borderRadius: 15 }}>
              <View
                style={{
                  flexDirection: isTablet ? "row" : "column",
                  justifyContent: "space-evenly",
                }}>
                <Heading
                  style={{ marginTop: isPhone ? 5 : 10, marginBottom: isPhone ? 5 : 10 }}
                  title="Sku Number:"
                  value={product.skuNumber}
                />
                <Heading title="Design Number:" value={product.designNumber} />
              </View>
            </Card>
            <Card style={{ margin: 10, borderRadius: 15 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: isTablet ? "space-evenly" : "flex-start",
                  marginTop: 5,
                  marginBottom: 10,
                }}>
                <Wrapper>
                  <Title
                    style={{
                      color: colors.accent,
                      marginTop: 10,
                      marginBottom: 5,
                    }}>
                    Weights:{" "}
                  </Title>
                  <Info title="Gross Weight:" value={product.grossWeight} />
                  <Info title="Diamond Weight:" value={product.totalDiamondWeight} />
                </Wrapper>
                <Wrapper style={{ justifyContent: "flex-end" }}>
                  <Info title="Net Weight:" value={product.netWeight} />
                  <Info title="Stone Weight:" value={product.totalStoneWeight} />
                </Wrapper>
              </View>
            </Card>
            <Card style={{ margin: 10, borderRadius: 15 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: isTablet ? "space-evenly" : "flex-start",
                }}>
                <Wrapper style={{ margin: 10 }}>
                  <Info title="Purity:" value={product.metalPurity + " Kt"} />
                  <Info title="Category:" value={product.itemCategory} />
                </Wrapper>
                <Wrapper style={{ margin: 10 }}>
                  <Info title="Color:" value={product.metalType} />
                  <Info title="Type:" value={product.itemType} />
                </Wrapper>
              </View>
            </Card>
          </ScrollView>
          {isTablet ? <AddToCartButton /> : null}
        </View>
        {!isTablet ? <AddToCartButton /> : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
