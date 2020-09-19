import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

const NavigationDrawer = () => (
  <Drawer.Navigator hideStatusBar={true}>
    <Drawer.Screen />
  </Drawer.Navigator>
);

export default NavigationDrawer;
