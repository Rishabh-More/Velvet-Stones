import React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";

import Catalogue from "../screens/Catalogue";
import ProductDetails from "../screens/ProductDetails";

const ProductStack = createStackNavigator();

const CatalogueStacks = () => (
  <ProductStack.Navigator
    //headerMode="none"
    screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>
    <ProductStack.Screen name="catalogue" component={Catalogue} options={{ headerShown: false }} />
    <ProductStack.Screen
      name="details"
      component={ProductDetails}
      //options={{ headerTitle: "Details" }}
    />
  </ProductStack.Navigator>
);

export default CatalogueStacks;
