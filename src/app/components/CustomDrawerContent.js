import React, { useState, useEffect, useContext } from "react";
import useDeviceOrientation from "@react-native-community/hooks";
import { isTablet, isPhone } from "react-native-device-detection";
import { useTheme } from "@react-navigation/native";
import { ThemeContext } from "../../App";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import ToggleSwitch from "toggle-switch-react-native";
import { Drawer, TouchableRipple } from "react-native-paper";
import { DrawerHeaderContent } from "./DrawerHeaderContent";

export function CustomDrawerContent(props) {
  const { isDarkTheme, setDarkTheme } = useContext(ThemeContext);
  const theme = useTheme();
  const { colors } = theme;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={drawer.drawerContainer}>
          <DrawerHeaderContent {...theme} />
          <Drawer.Section style={drawer.drawerSection}>
            <DrawerItem
              label={() => (
                <Text style={{ color: colors.text }}>Catalogue</Text>
              )}
              onPress={() => props.navigation.navigate("Home")}
            />
            <DrawerItem
              label={() => <Text style={{ color: colors.text }}>Cart</Text>}
              onPress={() => props.navigation.navigate("Cart")}
            />
            <DrawerItem
              label={() => (
                <Text style={{ color: colors.text }}>Active Links</Text>
              )}
              onPress={() => props.navigation.navigate("Links")}
            />
            <DrawerItem
              label={() => <Text style={{ color: colors.text }}>About Us</Text>}
            />
          </Drawer.Section>
          <Drawer.Section title="Theme">
            <TouchableRipple onPress={() => setDarkTheme(!isDarkTheme)}>
              <View style={drawer.preferences}>
                <Text style={{ color: colors.text }}>{theme.name}</Text>
                {/**Add your Toggle Switch Here */}
                <View pointerEvents="none">
                  <ToggleSwitch
                    isOn={theme.dark}
                    onColor={theme.colors.accent}
                    labelStyle={{ color: "black", fontWeight: "900" }}
                    size="medium"
                    onToggle={(isOn) => console.log("changed to : ", isOn)}
                  />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={drawer.bottomSection}>
        <DrawerItem
          label={() => <Text style={{ color: colors.text }}>Log Out</Text>}
          onPress={() => console.log("signing out")}
        />
      </Drawer.Section>
    </SafeAreaView>
  );
}

const drawer = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  drawerSection: {
    marginTop: 15,
  },
  preferences: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  bottomSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
});
