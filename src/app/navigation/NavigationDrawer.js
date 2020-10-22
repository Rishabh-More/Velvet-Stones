import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Cart from "../screens/Cart";
import CatalogueLinks from "../screens/CatalogueLinks";
import RootStacks from "./RootStacks";
import { CustomDrawerContent } from "./../components/CustomDrawerContent";

const Drawer = createDrawerNavigator();

const NavigationDrawer = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    hideStatusBar={true}>
    <Drawer.Screen name="Home" component={RootStacks} />
    <Drawer.Screen name="Cart" component={Cart} />
    <Drawer.Screen name="Links" component={CatalogueLinks} />
  </Drawer.Navigator>
);

export default NavigationDrawer;
