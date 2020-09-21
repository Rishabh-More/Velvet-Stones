import "react-native-gesture-handler";
import React, { createContext, useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { AppDefaultTheme, AppDarkTheme } from "./app/res/Themes";
import { StoreProvider } from "./app/config/Store";
import { NavigationContainer } from "@react-navigation/native";
import NavigationDrawer from "./app/navigation/NavigationDrawer";

export const ThemeContext = createContext();

export default function App() {
  const [isDarkTheme, setDarkTheme] = useState(false);

  const theme = isDarkTheme ? AppDarkTheme : AppDefaultTheme;
  return (
    <PaperProvider theme={theme}>
      <StoreProvider>
        <ThemeContext.Provider value={{ isDarkTheme, setDarkTheme }}>
          <NavigationContainer theme={theme}>
            <NavigationDrawer />
          </NavigationContainer>
        </ThemeContext.Provider>
      </StoreProvider>
    </PaperProvider>
  );
}
