import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from "react-native-paper";

const AppDefaultTheme = {
  name: "Light Theme",
  dark: false,
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: "rgb(255, 255, 255)",
    accent: "rgb(192, 24, 91)",
    accentDark: "rgb(139, 0, 50)",
    accentLight: "rgb(249, 86, 136)",
    statusBar: "rgb(232, 232, 232)",
    background: "rgb(245, 245, 240)",
    card: "rgb(255, 255, 255)",
    modal: "rgb(245,245,240)",
    text: "rgb(28, 28, 30)",
    textSubtle: "rgb(87, 87, 87)",
    textInverse: "rgb(255, 255, 255)",
    border: "rgb(224, 224, 224)",
    notification: "rgb(255, 69, 58)",
  },
};

const AppDarkTheme = {
  name: "Dark Theme",
  dark: true,
  ...PaperDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    primary: "rgb(36, 36, 36)",
    accent: "rgb(192, 24, 91)",
    accentDark: "rgb(139, 0, 50)",
    accentLight: "rgb(249, 86, 136)",
    statusBar: "rgb(18, 18, 18)",
    background: "rgb(18, 18, 18)",
    card: "rgb(30, 30, 30)",
    modal: "rgb(55, 55, 55)",
    text: "rgb(225, 225, 225)",
    textSubtle: "rgb(245,245,245)",
    textInverse: "rgb(28, 28, 30)",
    border: "rgb(87, 87, 87)",
    notification: "rgb(255, 69, 58)",
  },
};

export { AppDefaultTheme, AppDarkTheme };
