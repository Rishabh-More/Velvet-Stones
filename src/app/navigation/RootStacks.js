import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import CatalogueStacks from "./CatalogueStacks";
import Filter from "./../screens/Filter";

const RootStack = createStackNavigator();

const RootStacks = () => (
  <RootStack.Navigator
    mode="modal"
    screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}
  >
    <RootStack.Screen
      name="root-catalogue"
      component={CatalogueStacks}
      options={{ headerShown: false }}
    />
    <RootStack.Screen name="filter" component={Filter} />
  </RootStack.Navigator>
);

export default RootStacks;
