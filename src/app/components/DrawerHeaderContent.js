import React from "react";
import useDeviceOrientation from "@react-native-community/hooks";
import { isTablet, isPhone } from "react-native-device-detection";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Title, Caption } from "react-native-paper";
import { color } from "react-native-reanimated";

export function DrawerHeaderContent(theme) {
  const { colors } = theme;
  const avatar =
    "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50";
  return (
    <View style={drawerHeader.container}>
      <View
        style={{
          flexDirection: "row",
          marginTop: 15,
        }}
      >
        <Avatar.Image source={{ uri: avatar }} size={50} />
        <View style={drawerHeader.userInfo}>
          <Title style={[drawerHeader.title, { color: colors.text }]}>
            Mohit Singh
          </Title>
          <Caption style={[drawerHeader.caption, { color: colors.text }]}>
            mohit.singh@gmail.com
          </Caption>
        </View>
      </View>
    </View>
  );
}

const drawerHeader = StyleSheet.create({
  container: {
    paddingLeft: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: "column",
    marginLeft: 15,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
});
