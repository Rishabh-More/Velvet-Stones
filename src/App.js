import "react-native-gesture-handler";
import React, { useState } from "react";
import {
  Appearance,
  AppearanceProvider,
  useColorScheme,
} from "react-native-appearance";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import NavigationDrawer from "./app/navigation/NavigationDrawer";

export default function App() {
  //Note: Dark Mode is only supported from Android 10+
  //it will always return as 'no-preference' for lower versions
  //adjust the toggle logic accordingly.
  const scheme = useColorScheme();
  console.log(scheme);

  const AppDefaultTheme = {
    dark: false,
    colors: {
      primary: "rgb(255, 255, 255)",
      accent: "rgb(192, 24, 91)",
      accentDark: "rgb(139, 0, 50)",
      accentLight: "rgb(249, 86, 136)",
      background: "rgb(202, 209, 216)",
      card: "rgb(255, 255, 255)",
      modal: "rgb(245,245,240)",
      text: "rgb(28, 28, 30)",
      border: "rgb(224, 224, 224)",
      notification: "rgb(255, 69, 58)",
    },
  };

  const AppDarkTheme = {
    dark: true,
    colors: {
      primary: "rgb(36, 36, 36)",
      accent: "rgb(192, 24, 91)",
      accentDark: "rgb(139, 0, 50)",
      accentLight: "rgb(249, 86, 136)",
      background: "rgb(18, 18, 18)",
      card: "rgb(30, 30, 30)",
      modal: "rgb(55, 55, 55)",
      text: "rgb(225, 225, 225)",
      border: "rgb(87, 87, 87)",
      notification: "rgb(255, 69, 58)",
    },
  };

  const theme = scheme == "dark" ? AppDarkTheme : AppDefaultTheme;
  return (
    <AppearanceProvider>
      <NavigationContainer theme={theme}>
        <NavigationDrawer />
      </NavigationContainer>
    </AppearanceProvider>
  );
}
