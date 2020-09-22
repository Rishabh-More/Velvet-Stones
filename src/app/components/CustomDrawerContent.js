import React, { useState, useEffect, useContext } from "react";
import useDeviceOrientation from "@react-native-community/hooks";
import { isTablet, isPhone } from "react-native-device-detection";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ThemeContext } from "../../App";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import ToggleSwitch from "toggle-switch-react-native";
import { Drawer, TouchableRipple, Divider } from "react-native-paper";
import { DrawerHeaderContent } from "./DrawerHeaderContent";

export function CustomDrawerContent(props) {
  const { isDarkTheme, setDarkTheme } = useContext(ThemeContext);
  const theme = useTheme();
  const { colors, dark, name } = theme;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={drawer.drawerContainer}>
          <DrawerHeaderContent {...theme} />
          <Divider />
          <Drawer.Section style={drawer.drawerSection}>
            <DrawerItem
              icon={({ size }) => (
                <Icon name="home-outline" color={colors.accent} size={size} />
              )}
              label={() => (
                <Text style={{ color: colors.text }}>Catalogue</Text>
              )}
              onPress={() => props.navigation.navigate("Home")}
            />
            <DrawerItem
              icon={({ size }) => (
                <Icon name="cart-outline" color={colors.accent} size={size} />
              )}
              label={() => <Text style={{ color: colors.text }}>Cart</Text>}
              onPress={() => props.navigation.navigate("Cart")}
            />
            <DrawerItem
              icon={({ size }) => (
                <Icon name="link-variant" color={colors.accent} size={size} />
              )}
              label={() => (
                <Text style={{ color: colors.text }}>Active Links</Text>
              )}
              onPress={() => props.navigation.navigate("Links")}
            />
            <DrawerItem
              icon={({ size }) => (
                <Icon
                  name="account-outline"
                  color={colors.accent}
                  size={size}
                />
              )}
              label={() => <Text style={{ color: colors.text }}>About Us</Text>}
            />
          </Drawer.Section>
          <Drawer.Section title="Theme">
            <TouchableRipple
              rippleColor={colors.accent}
              onPress={() => setDarkTheme(!isDarkTheme)}
            >
              <View style={drawer.preferences}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Icon
                    style={{ marginLeft: 5, marginRight: 10 }}
                    name={dark ? "moon-waning-crescent" : "white-balance-sunny"}
                    color={colors.accent}
                    size={20}
                  />
                  <Text style={{ color: colors.text }}>{name}</Text>
                </View>
                {/**Add your Toggle Switch Here */}
                <View pointerEvents="none">
                  <ToggleSwitch
                    isOn={dark}
                    onColor={colors.accent}
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
          icon={({ size }) => (
            <Icon name="logout" color={colors.accent} size={size} />
          )}
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
    marginTop: 10,
  },
  preferences: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  bottomSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
});
