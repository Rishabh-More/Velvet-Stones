import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "@react-navigation/native";
import { useStore } from "../../config/Store";
import { usePrevious } from "../../hooks/usePrevious";
import { View, Text, StyleSheet, Image } from "react-native";
import { Card, Title, TextInput } from "react-native-paper";
import { Button } from "react-native-elements";
import Counter from "react-native-counters";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Toast from "react-native-simple-toast";

const CartOrderItem = ({ cart }) => {
  const { colors, dark } = useTheme();

  //State Codes
  const { state, dispatch } = useStore();
  const [updated, setUpdated] = useState(false);
  const [props, setProps] = useState({
    skuNumber: cart.skuNumber,
    metalPurity: cart.metalPurity,
    metalType: cart.metalType,
    orderProductRemarks: "",
    orderProductQuantity: 1,
  });
  const prevObject = usePrevious(props);
  console.log("initial props object", props);
  console.log("previous object", prevObject);

  useEffect(() => {
    //By Default add orderProductQuantity & orderProductRemarks
    //to cart item
    dispatch({ type: "UPDATE_CART_ITEM", payload: props });
  }, []);

  async function removeFromCart() {
    try {
      const index = state.data.cart.map((item) => item.skuNumber).indexOf(cart.skuNumber);
      console.log("index is", index);
      await dispatch({ type: "DELETE_FROM_CART", payload: index });
      Toast.show(`Removed item ${cart.skuNumber}`);
    } catch (error) {
      console.log("couldn't remove from cart", error);
    }
  }
  return (
    <Card style={styles.container}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View
          style={{
            flex: 1.5,
          }}>
          <View
            style={{
              margin: 5,
              borderRadius: 10,
              borderWidth: 0.5,
              borderColor: colors.accent,
            }}>
            <Image
              style={{
                flex: 1,
                borderRadius: 10,
                maxWidth: "100%",
                aspectRatio: 0.85,
                resizeMode: "cover",
              }}
              source={
                cart.imageUrl == ""
                  ? require("../../res/assets/broken-image.png")
                  : { uri: cart.imageUrl }
              }
            />
          </View>
        </View>
        <View style={{ flex: 3 }}>
          <View style={{ flexDirection: "row", alignItems: "flex-end", margin: 5 }}>
            {/* <Title style={{ color: colors.accent }}>{cart.skuNumber}</Title> */}
            <Text style={{ margin: 5, color: colors.text }}>Design Number: </Text>
            <Title style={{ color: colors.accent }}>{cart.designNumber}</Title>
          </View>
          <View style={{ flexDirection: "row", zIndex: 5 }}>
            <View
              style={{
                flex: 1,
                height: 50,
                justifyContent: "center",
                marginEnd: 10,
                marginTop: 5,
                marginStart: 5,
                marginBottom: 5,
                borderRadius: 5,
                borderColor: colors.border,
                borderWidth: 1,
              }}>
              <SectionedMultiSelect
                single={true}
                disabled={state.indicators.requestedFeature != "order" ? true : false}
                colors={{ primary: colors.accent, selectToggleTextColor: colors.text }}
                showDropDowns={false}
                expandDropDowns={true}
                items={[
                  {
                    name: "Purity",
                    id: 0,
                    purity: [
                      { name: "14 Kt", id: "14.0" },
                      { name: "18 Kt", id: "18.0" },
                    ],
                  },
                ]}
                selectedItems={[props.metalPurity]}
                uniqueKey="id"
                subKey="purity"
                IconRenderer={MaterialIcons}
                styles={{
                  selectToggle: { marginStart: 10, marginEnd: 10 },
                  container: {
                    maxHeight: "30%",
                    width: "80%",
                    alignSelf: "center",
                    borderRadius: 15,
                  },
                  modalWrapper: { justifyContent: "center" },
                }}
                onSelectedItemsChange={(value) => {
                  setProps({ ...props, metalPurity: value[0] });
                  if (updated) setUpdated(false);
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                height: 50,
                justifyContent: "center",
                marginEnd: 10,
                marginTop: 5,
                marginBottom: 5,
                borderRadius: 5,
                borderColor: colors.border,
                borderWidth: 1,
              }}>
              <SectionedMultiSelect
                single={true}
                disabled={state.indicators.requestedFeature != "order" ? true : false}
                colors={{ primary: colors.accent, selectToggleTextColor: colors.text }}
                showDropDowns={false}
                expandDropDowns={true}
                items={[
                  {
                    name: "Color Types",
                    id: 0,
                    colors: [
                      { name: "YG", id: "YG" },
                      { name: "WG", id: "WG" },
                      { name: "PG", id: "PG" },
                      { name: "YW", id: "YW" },
                      { name: "PW", id: "PW" },
                      { name: "GW", id: "GW" },
                      { name: "PA", id: "PA" },
                    ],
                  },
                ]}
                selectedItems={[props.metalType]}
                uniqueKey="id"
                subKey="colors"
                IconRenderer={MaterialIcons}
                styles={{
                  selectToggle: { marginStart: 10, marginEnd: 10 },
                  container: {
                    maxHeight: "50%",
                    width: "80%",
                    alignSelf: "center",
                    borderRadius: 15,
                  },
                  modalWrapper: { justifyContent: "center" },
                }}
                onSelectedItemsChange={(value) => {
                  setProps({ ...props, metalType: value[0] });
                  if (updated) setUpdated(false);
                }}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", margin: 5 }}>
            <TextInput
              label="Remarks"
              disabled={state.indicators.requestedFeature != "order" ? true : false}
              placeholder="Type some Remarks"
              value={props.orderProductRemarks}
              underlineColor={colors.accent}
              style={{ flex: 1, borderRadius: 5 }}
              theme={{ colors: { primary: colors.accent, background: colors.card } }}
              onChangeText={(text) => {
                setProps({ ...props, orderProductRemarks: text });
                if (updated) setUpdated(false);
              }}
            />
            <Button
              type="outline"
              icon={
                <MaterialCommunityIcons name="trash-can-outline" size={28} color={colors.accent} />
              }
              buttonStyle={{
                margin: 5,
                alignSelf: "flex-end",
                borderColor: colors.accent,
                borderRadius: 5,
                borderWidth: 0.5,
              }}
              onPress={() => removeFromCart()}
            />
          </View>
          {state.indicators.requestedFeature == "order" ? (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                margin: 5,
                justifyContent: "flex-end",
                alignItems: "center",
              }}>
              <Counter
                start={1}
                min={1}
                max={100}
                buttonStyle={{
                  margin: 5,
                  borderColor: colors.accent,
                  borderRadius: 10,
                  borderWidth: 1.5,
                }}
                buttonTextStyle={{ color: colors.accent }}
                countTextStyle={{ color: colors.accent }}
                onChange={(value) => {
                  setProps({ ...props, orderProductQuantity: value });
                  if (updated) setUpdated(false);
                }}
              />
              <Button
                title="Save"
                disabled={props === prevObject || prevObject == null ? true : false}
                containerStyle={{ flex: 1 }}
                buttonStyle={{ backgroundColor: colors.accent, borderRadius: 10 }}
                onPress={async () => {
                  console.log("dispatched to store");
                  //Step 1: If updated is false, make it true
                  //Because we have just updated the item
                  if (!updated) setUpdated(true);
                  //Step 2: Dispatch the object to store
                  await dispatch({ type: "UPDATE_CART_ITEM", payload: props });
                  Toast.show(`Item Updated: ${cart.skuNumber}`);
                }}
              />
            </View>
          ) : null}
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
