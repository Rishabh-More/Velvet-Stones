import "react-native-gesture-handler";
import React from "react";
import {
  Appearance,
  AppearanceProvider,
  useColorScheme,
} from "react-native-appearance";
import { AppDefaultTheme, AppDarkTheme } from "./app/res/Themes";
import { StoreProvider } from "./app/config/Store";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import NavigationDrawer from "./app/navigation/NavigationDrawer";

export default function App() {
  //Note: Dark Mode is only supported from Android 10+
  //it will always return as 'no-preference' for lower versions
  //adjust the toggle logic accordingly.
  const scheme = useColorScheme();
  console.log(scheme);

  const theme = scheme == "dark" ? AppDarkTheme : AppDefaultTheme;
  return (
    <AppearanceProvider>
      <StoreProvider>
        <NavigationContainer theme={theme}>
          <NavigationDrawer />
        </NavigationContainer>
      </StoreProvider>
    </AppearanceProvider>
  );
}
