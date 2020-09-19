import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/Login";
import Verification from "../screens/Verification";
import ForgotPassword from "../screens/ForgotPassword";

const AuthorizedStack = createStackNavigator();

const AuthStacks = () => (
  <AuthorizedStack.Navigator headerMode="none">
    <AuthorizedStack.Screen name="login" component={Login} />
    <AuthorizedStack.Screen name="verify" component={Verification} />
    <AuthorizedStack.Screen name="forgot_pass" component={ForgotPassword} />
  </AuthorizedStack.Navigator>
);

export default AuthStacks;
