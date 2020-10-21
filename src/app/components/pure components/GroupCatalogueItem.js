import React from "react";
import { isPhone } from "react-native-device-detection";
import { useDeviceOrientation } from "@react-native-community/hooks";
import { useTheme } from "@react-navigation/native";
import { View, Text, StyleSheet, Image } from "react-native";
import { Card, Title } from "react-native-paper";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const tabThumbImageHeight = "70%";
const phoneThumbImageHeight = "65%";

const GroupCatalogueItem = ({ design }) => {
  const orientation = useDeviceOrientation();
  const { colors, dark } = useTheme();

  return (
    <Card
      style={[
        styles.container,
        isPhone ? { aspectRatio: orientation.portrait ? 1 : 1 } : { aspectRatio: orientation.portrait ? 1.3 : 1.5 },
      ]}>
      <Image style={[styles.image, { borderColor: colors.accent }]} source={{ uri: design.imageUrl }} />
      <View style={styles.info}>
        <View style={styles.textInfo}>
          <Title style={{ color: colors.accent }}>{design.designNumber}</Title>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: colors.text }}>Quantity: {design.count}</Text>
        </View>
        <View style={styles.button}>
          <Button icon={<Icon name="cart-arrow-down" size={isPhone ? 30 : 40} color={colors.accent} />} type="clear" />
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
  info: {
    flexDirection: "row",
    marginStart: 5,
    marginEnd: 5,
  },
  textInfo: {
    flex: 1,
    marginStart: 5,
    margin: 3,
  },
  image: {
    margin: 5,
    borderRadius: 10,
    maxWidth: "100%",
    height: isPhone ? phoneThumbImageHeight : tabThumbImageHeight,
    resizeMode: "cover",
    borderWidth: 0.5,
  },
  button: {
    justifyContent: "flex-end",
  },
});

export default GroupCatalogueItem;
