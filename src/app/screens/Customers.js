import React, { useEffect, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useStore } from "../config/Store";
import { getCustomersForShop, addCustomerToShop, generateOrder } from "../api/ApiService";
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";
import { Card, Title, TextInput, HelperText, Divider } from "react-native-paper";
import { Button } from "react-native-elements";
import MultiSelect from "react-native-multiple-select";
import { Fold } from "react-native-animated-spinkit";
import Toast from "react-native-simple-toast";

export default function Customers() {
  const navigation = useNavigation();
  const { colors, dark } = useTheme();

  //State Codes
  const { state, dispatch } = useStore();
  const [isVisible, setVisible] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [picker, setPicker] = useState([]);
  const [selected, setSelected] = useState({
    id: 0,
    isPrimary: 1,
    shopId: 115,
    name: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });
  const [errorName, setNameError] = useState(false);
  const [errorEmail, setEmailError] = useState(false);
  const [errorAddress, setAddressError] = useState(false);
  const [order, setOrder] = useState({
    shopId: 115,
    customerId: 0,
    remarks: "",
    products: state.data.cart,
  });

  useEffect(() => {
    setVisible(true);
    getCustomersForShop(115)
      .then((data) => {
        console.log("api response", data);
        let temp = data.map((item) => {
          item.id = String(item.id);
          return item;
        });
        console.log("fixed array", temp);
        console.log("items in cart", state.data.cart);
        setCustomers(data);
        setPicker(temp);
        setVisible(false);
      })
      .catch((error) => {
        console.log("response error", error);
      });
  }, []);

  useEffect(() => {
    console.log("selected updated", selected);
  }, [selected]);

  useEffect(() => {
    console.log("order object", order);
  }, [order]);

  async function ValidateCustomer() {
    var pattern = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;
    //Step 1: Validate Customer fields.
    if (selected.name == "") {
      //customer name cannot be blank
      setNameError(true);
      return;
    } else {
      console.log("resolved name");
      setNameError(false);
    }
    //await sleep(1000);
    if (selected.email == "") {
      //email cannot be empty
      setEmailError(true);
      return;
    } else if (selected.email != "" && !pattern.test(selected.email)) {
      //email cannot be Invalid
      setEmailError(true);
      return;
    } else {
      console.log("resolved email");
      setEmailError(false);
    }
    if (selected.addressLine1 == "") {
      //address cannot be empty
      setAddressError(true);
      return;
    } else {
      console.log("resolved address");
      setAddressError(false);
    }
    //Step 2: Check if customer exists or not. If not
    // Add Customer to shop
    const found = customers.some(
      (item) =>
        item.name == selected.name &&
        item.email == selected.email &&
        item.addressLine1 == selected.addressLine1 &&
        item.phone == selected.phone
    );
    if (!found) {
      //Call the api, add customer to shop
      addCustomerToShop(selected)
        .then(async (data) => {
          console.log("add customers response", data);
          await setSelected({ ...selected, id: data.id });
        })
        .catch((error) => {
          console.log("response error", error);
        });
    }
    //Step 3: Call the Order Api
    Toast.show("Validated Sucessfully!!");
    ExportOrder();
  }

  async function ExportOrder() {
    await setOrder({ ...order, customerId: parseInt(selected.id) });
    generateOrder(order)
      .then((data) => {
        console.log("order created", data);
      })
      .catch((error) => {
        console.log("response error", error);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card style={{ margin: 5, borderRadius: 15 }}>
          <Title style={{ marginStart: 10, marginTop: 10 }}>Shop Customers</Title>
          {isVisible ? (
            <View
              style={{
                flexDirection: "row",
                margin: 10,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Fold size={24} color={colors.accent} style={{ margin: 10 }} />
              <Text style={{ color: colors.text }}>Please Wait, getting your Customers</Text>
            </View>
          ) : null}
          <MultiSelect
            single={true}
            items={picker}
            uniqueKey="id"
            hideTags={false}
            fixedHeight={true}
            selectText={selected.name != "" ? selected.name : "Select Customer"}
            selectedItems={[selected]}
            styleMainWrapper={styles.selectMainWrapper}
            styleDropdownMenu={styles.selectDropdownMenu}
            styleDropdownMenuSubsection={[
              styles.selectDropdownMenuSubSection,
              { backgroundColor: colors.primary, borderColor: colors.border },
            ]}
            styleTextDropdownSelected={[
              styles.selectTextDropdownSelected,
              { color: selected.name != "" ? colors.accent : colors.text },
            ]}
            styleInputGroup={[styles.selectInputGroup, { backgroundColor: colors.primary }]}
            styleSelectorContainer={[
              styles.selectSelectorContainer,
              { backgroundColor: colors.primary, borderColor: colors.primary },
            ]}
            styleListContainer={{ backgroundColor: colors.primary }}
            styleRowList={{ backgroundColor: colors.primary }}
            itemTextColor={colors.textSubtle}
            submitButtonColor={colors.accentDark}
            onSelectedItemsChange={(value) => {
              let picked = customers.find((item) => item.id == parseInt(value));
              console.log("picked customer object", picked);
              setSelected({
                ...selected,
                id: parseInt(picked.id),
                name: picked.name,
                email: picked.email,
                phone: picked.phone,
                addressLine1: picked.addressLine1,
                shopId: picked.shopId,
              });
            }}
          />
        </Card>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Divider style={{ flex: 1, width: "100%" }} />
          <Text style={{ margin: 5, color: "grey" }}>or</Text>
          <Divider style={{ flex: 1 }} />
        </View>
        <Card style={{ margin: 5, borderRadius: 15 }}>
          <View style={{ flex: 1 }}>
            <Title style={{ marginStart: 10, marginTop: 10 }}>Enter Customer Details</Title>
            <View style={{ marginStart: 10, marginEnd: 10, margin: 5 }}>
              <TextInput
                mode="outlined"
                label="Customer Name (required)"
                value={selected.name}
                error={errorName}
                theme={{
                  colors: { primary: colors.accent, background: colors.primary, error: "red" },
                }}
                onChangeText={(text) => setSelected({ ...selected, name: text })}
              />
              {errorName ? (
                <HelperText type="error" visible={errorName} theme={{ colors: { error: "red" } }}>
                  Customer Name must not be Empty
                </HelperText>
              ) : null}
            </View>
            <View style={{ marginStart: 10, marginEnd: 10, margin: 5 }}>
              <TextInput
                mode="outlined"
                label="Customer Email (required)"
                value={selected.email}
                error={errorEmail}
                theme={{
                  colors: { primary: colors.accent, background: colors.primary, error: "red" },
                }}
                onChangeText={(text) => setSelected({ ...selected, email: text })}
              />
              {errorEmail ? (
                <HelperText type="error" visible={errorEmail} theme={{ colors: { error: "red" } }}>
                  Invalid Email Address
                </HelperText>
              ) : null}
            </View>
            <View style={{ marginStart: 10, marginEnd: 10, margin: 5 }}>
              <TextInput
                mode="outlined"
                label="Customer Address (required)"
                value={selected.addressLine1}
                error={errorAddress}
                theme={{
                  colors: { primary: colors.accent, background: colors.primary, error: "red" },
                }}
                multiline={true}
                onChangeText={(text) => setSelected({ ...selected, addressLine1: text })}
              />
              {errorAddress ? (
                <HelperText
                  type="error"
                  visible={errorAddress}
                  theme={{ colors: { error: "red" } }}>
                  Customer Address cannot be Empty
                </HelperText>
              ) : null}
            </View>
            <View
              style={{
                flexDirection: "row",
                marginStart: 10,
                marginEnd: 10,
                marginTop: 5,
                marginBottom: 15,
              }}>
              <TextInput
                mode="outlined"
                label="Contact No."
                value={selected.phone.toString()}
                theme={{ colors: { primary: colors.accent, background: colors.primary } }}
                style={{ flex: 1, margin: 5, marginStart: 0 }}
                onChangeText={(text) => setSelected({ ...selected, phone: parseInt(text) || 0 })}
              />
              <TextInput
                mode="outlined"
                label="Order Remarks"
                value={order.remarks}
                style={{ flex: 1, margin: 5, marginEnd: 0 }}
                theme={{ colors: { primary: colors.accent, background: colors.primary } }}
                onChangeText={(text) => setOrder({ ...order, remarks: text })}
              />
            </View>
          </View>
        </Card>
      </ScrollView>
      <Divider style={{ width: "90%", alignSelf: "center" }} />
      <View>
        <Button
          title="Generate Order"
          buttonStyle={{ height: 50, backgroundColor: colors.accent, borderRadius: 15 }}
          containerStyle={{ margin: 10 }}
          onPress={() => ValidateCustomer()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  selectMainWrapper: {
    margin: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  selectDropdownMenu: {
    margin: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  selectDropdownMenuSubSection: {
    borderRadius: 10,
    borderWidth: 1,
  },
  selectTextDropdownSelected: {
    padding: 5,
    paddingStart: 20,
    paddingEnd: 20,
  },
  selectInputGroup: {
    height: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  selectSelectorContainer: {
    borderRadius: 10,
    borderWidth: 1,
  },
});
