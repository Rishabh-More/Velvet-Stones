import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";
import { Card, Title, TextInput, Divider } from "react-native-paper";
import { Button } from "react-native-elements";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Customers() {
  const navigation = useNavigation();
  const { colors, dark } = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card style={{ margin: 5, borderRadius: 15 }}>
          <Title style={{ marginStart: 10, marginTop: 10 }}>Select Customer</Title>
          <SectionedMultiSelect
            single={true}
            colors={{ primary: colors.accent, chipColor: colors.accent }}
            items={[
              {
                name: "Shop Customers",
                id: 0,
                children: [], //TODO Fill in Customer Details here
              },
            ]}
            uniqueKey="id"
            IconRenderer={Icon}
            selectText="Select a Customer"
            showDropDowns={false}
            //TODO Update the below Input Fiels with the data of existing customer
            onSelectedItemsChange={(value) => console.log("Customer Selected", value)}
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
              <TextInput mode="outlined" label="Customer Name" />
            </View>
            <View style={{ marginStart: 10, marginEnd: 10, margin: 5 }}>
              <TextInput mode="outlined" label="Customer Email" />
            </View>
            <View style={{ marginStart: 10, marginEnd: 10, margin: 5 }}>
              <TextInput mode="outlined" label="Customer Address" />
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
                style={{ flex: 1, margin: 5, marginStart: 0 }}
              />
              <TextInput
                mode="outlined"
                label="Order Remarks"
                style={{ flex: 1, margin: 5, marginEnd: 0 }}
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
          onPress={() => navigation.navigate("success")}
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
});
