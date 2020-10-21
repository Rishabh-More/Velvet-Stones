import React from "react";
import { isPhone } from "react-native-device-detection";
import { useDeviceOrientation } from "@react-native-community/hooks";
import { useTheme } from "@react-navigation/native";
import { View, Text, StyleSheet, Image } from "react-native";
import { Card, Title } from "react-native-paper";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const tabImageThumbHeight = "60%";
const phoneImageThumbHeight = "40%";

const SingleCatalogueItem = ({ product }) => {
  const orientation = useDeviceOrientation();
  const { colors, dark } = useTheme();
  return (
    <Card
      style={[
        styles.container,
        isPhone ? { aspectRatio: orientation.portrait ? 0.9 : 1 } : { aspectRatio: orientation.portrait ? 0.9 : 0.95 },
      ]}>
      <Image
        style={styles.image}
        source={product.imageUrl == "" ? require("../../res/assets/broken-image.png") : { uri: product.imageUrl }}
      />
      <Title style={[styles.title, { color: colors.accent }]}>{product.skuNumber}</Title>
      <View style={styles.content}>
        <View>
          <Text style={[styles.text, { color: colors.text }]}>
            <Text style={{ fontWeight: "bold", color: colors.text }}>Design No: </Text>
            {product.designNumber}
          </Text>
          <Text style={[styles.text, { color: colors.text }]}>
            <Text style={{ fontWeight: "bold", color: colors.text }}>Item Category: </Text>
            {product.itemCategory}
          </Text>
        </View>
        <View style={styles.info}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.text, { color: colors.text }]}>
              <Text style={{ fontWeight: "bold" }}>Item Type: </Text>
              {product.itemType}
            </Text>
            <Text style={[styles.text, { color: colors.text }]}>
              <Text style={{ fontWeight: "bold" }}>Gross Wt: </Text>
              {product.grossWeight}
            </Text>
            <Text style={[styles.text, { color: colors.text }]}>
              <Text style={{ fontWeight: "bold" }}>Net Wt: </Text>
              {product.netWeight}
            </Text>
            <Text style={{ marginLeft: 5, fontWeight: "bold", color: colors.text }}>
              Item Status:{" "}
              <Text
                style={{
                  color: product.itemStatus == "INSTOCK" ? colors.accent : "grey",
                }}>
                {product.itemStatus}
              </Text>
            </Text>
          </View>
          <View style={styles.button}>
            <Button
              type="outline"
              icon={<Icon name="plus" size={20} color={colors.accent} />}
              buttonStyle={{ borderColor: colors.accent }}
              containerStyle={{ margin: 5, marginBottom: 5, width: 50 }}
              //onPress={someProp("item 1")}
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
    marginLeft: 5,
  },
  image: {
    margin: 3,
    borderRadius: 10,
    maxWidth: "100%",
    height: isPhone ? phoneImageThumbHeight : tabImageThumbHeight,
    resizeMode: "cover",
  },
  button: {
    flexDirection: "column-reverse",
    alignItems: "flex-end",
  },
});

export default SingleCatalogueItem;
