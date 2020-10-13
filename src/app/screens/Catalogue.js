import React, {useState, useEffect} from "react";
import {useTheme} from "@react-navigation/native";
import {useStore} from "../config/Store"
import {
  useDeviceOrientation,
  useDimensions,
} from "@react-native-community/hooks";
import {isTablet, isPhone} from "react-native-device-detection";
import {SafeAreaView, View, Text, StyleSheet, FlatList} from "react-native";
import {CatalogueCustomHeader} from "../components/CatalogueCustomHeader";
import {BarIndicator} from "react-native-indicators";
import {getProductsFromShop} from "../api/ApiService";

export default function Catalogue () {
  const {colors, dark}=useTheme();
  const {state, dispatch}=useStore();
  const dimensions=useDimensions();
  //console.log("screen dimensions", dimensions);
  //console.log("state object", state.data)

  useEffect(() => {
    getProductsFromShop().then((data) => {
      dispatch({type: 'UPDATE_PRODUCTS', payload: data})
    }).catch((error) => {
      console.log("response error", error)
    })
  }, []);

  useEffect(() => {
    if (state.data.products.length!=0) {
      console.log("data indicating is", state.indicators.isDataUpdating)
      dispatch({type: 'SET_DATA_FLAG', payload: !state.indicators.isDataUpdating})
    }
  }, [ state.data.products ])

  return (
    <SafeAreaView style={styles.container}>
      <CatalogueCustomHeader />
      {/* <FlatList onViewableItemsChanged /> */}

      {/**Show Loading OverLay if array is still updating */}
      { state.indicators.isDataUpdating==true? <View style={{width: "100%", flex: 1}}>
        <View
          style={{
            flex: 1,
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        >
          <View
            style={{
              flex: 1,
              position: "absolute",
              opacity: dark? 0.3:0.9,
              backgroundColor: dark? colors.accentDark:colors.primary,
              width: "100%",
              height: "100%",
              zIndex: 1,
            }}
          ></View>
          <View
            style={{
              flex: 1,
              zIndex: 2,
              width: "100%",
              height: "100%",
              opacity: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{color: colors.text}}>
              Please Wait, Updating List...
            </Text>
            <BarIndicator
              size={30}
              count={5}
              color={colors.accent}
              style={{maxHeight: 75}}
            />
          </View>
        </View>
      </View>:null}
    </SafeAreaView>
  );
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
