import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Catalogue from "../screens/Catalogue";
import ProductDetails from "../screens/ProductDetails";

const ProductStack = createStackNavigator();

const CatalogueStacks = () => (
  <ProductStack.Navigator headerMode="none">
    <ProductStack.Screen name="catalogue" component={Catalogue} />
    <ProductStack.Screen name="details" component={ProductDetails} />
  </ProductStack.Navigator>
);

export default CatalogueStacks;
