import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CatalogueStacks from "./CatalogueStacks";
import Cart from "../screens/Cart";
import ActiveLinks from "../screens/ActiveLinks";

const Drawer = createDrawerNavigator();

const NavigationDrawer = () => (
  <Drawer.Navigator hideStatusBar={true}>
    <Drawer.Screen name="Home" component={CatalogueStacks} />
    <Drawer.Screen name="Cart" component={Cart} />
    <Drawer.Screen name="Links" component={ActiveLinks} />
  </Drawer.Navigator>
);

export default NavigationDrawer;
