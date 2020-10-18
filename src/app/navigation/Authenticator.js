import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useStore } from "../config/Store";
import AuthStacks from "./AuthStacks";
import NavigationDrawer from "./NavigationDrawer";

const Authenticator = () => {
  //TODO maybe show a temp splash screen till token and session is retreived from realm db
  const { state, dispatch } = useStore();

  useEffect(() => {
    async function prepareAuthorization() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (error) {
        console.error("Splash Screen Error occured", error);
      }
      getAuthState();
    }
    prepareAuthorization();
  }, []);

  async function getAuthState() {
    try {
      //TODO 1. Customize the Expo SplashScreen
      //2. Test if the SplashScreen works correctly
      //3. Resolve the auth and set [authentication.isSignedIn] using dispatch
    } catch (error) {
      console.error("Auth error occured", error);
    } finally {
      await SplashScreen.hideAsync();
    }
  }

  return state.authentication.isSignedIn ? <NavigationDrawer /> : <AuthStacks />;
};

export default Authenticator;
