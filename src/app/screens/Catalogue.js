import React, { useState, useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import { useStore } from "../config/Store";
import { useDeviceOrientation, useDimensions } from "@react-native-community/hooks";
import { isTablet, isPhone } from "react-native-device-detection";
import { SafeAreaView, View, Text, StyleSheet, FlatList } from "react-native";
import { CatalogueCustomHeader } from "../components/CatalogueCustomHeader";
import { BarIndicator } from "react-native-indicators";
import { getProductsFromShop } from "../api/ApiService";
import SingleCatalogueItem from "../components/pure components/SingleCatalogueItem";
import GroupCatalogueItem from "../components/pure components/GroupCatalogueItem";
import useSortFilter from "../hooks/useSortFilter";

export default function Catalogue() {
  //Configuration
  const dimensions = useDimensions();
  const orientation = useDeviceOrientation();
  const { colors, dark } = useTheme();

  const phoneColumns = isPhone && orientation.portrait ? 2 : 3;
  const tabColumns = isTablet && orientation.portrait ? 3 : 4;

  //State Codes
  const { state, dispatch } = useStore();
  const { sorted, SortBy } = useSortFilter();
  const [refresh, updateRefresh] = useState(false);

  useEffect(() => {
    getProductsFromShop()
      .then((data) => {
        dispatch({ type: "SET_PRODUCTS", payload: data });
      })
      .catch((error) => {
        console.log("response error", error);
      });
  }, []);

  useEffect(() => {
    refresh ? updateRefresh(false) : updateRefresh(true);
    if (state.data.products.length != 0) {
      console.log("data indicating is", state.indicators.isDataUpdating);
      dispatch({ type: "SET_DATA_FLAG", payload: false });
    }
  }, [state.data.products]);

  useEffect(() => {
    console.log("state after sort updated", state.indicators.isSortByGroup);
    if (state.indicators.isSortByGroup) {
      SortBy("group");
    } else {
      console.log("sku logic executed");
      SortBy("item");
    }
  }, [state.indicators.isSortByGroup]);

  useEffect(() => {
    console.log("sorted data is", sorted);
    dispatch({ type: "SET_DATA_FLAG", payload: true });
    dispatch({ type: "UPDATE_PRODUCTS", payload: sorted });
  }, [sorted]);

  return (
    <SafeAreaView style={styles.container}>
      <CatalogueCustomHeader />
      <View style={{ flex: 1 }}>
        <FlatList
          key={[orientation, refresh]}
          numColumns={isPhone ? phoneColumns : tabColumns}
          style={styles.flatlist}
          columnWrapperStyle={styles.columns}
          data={state.data.products}
          extraData={refresh}
          keyExtractor={(item) => (state.indicators.isSortByGroup ? item.designNumber : item.skuNumber)}
          renderItem={({ item }) =>
            state.indicators.isSortByGroup ? (
              <GroupCatalogueItem design={item} />
            ) : (
              <SingleCatalogueItem product={item} />
            )
          }
        />

        {/**Show Loading OverLay if array is still updating */}
        {state.indicators.isDataUpdating == true ? (
          <View style={{ width: "100%", height: "100%", flex: 1, position: "absolute" }}>
            <View
              style={{
                flex: 1,
                position: "absolute",
                width: "100%",
                height: "100%",
              }}>
              <View
                style={{
                  flex: 1,
                  position: "absolute",
                  opacity: dark ? 0.3 : 0.9,
                  backgroundColor: dark ? colors.accentDark : colors.primary,
                  width: "100%",
                  height: "100%",
                  zIndex: 1,
                }}></View>
              <View
                style={{
                  flex: 1,
                  zIndex: 2,
                  width: "100%",
                  height: "100%",
                  opacity: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <Text style={{ color: colors.text }}>Please Wait, Updating List...</Text>
                <BarIndicator size={30} count={5} color={colors.accent} style={{ maxHeight: 75 }} />
              </View>
            </View>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlist: {
    marginLeft: 2,
    marginTop: 10,
    marginRight: 2,
    marginBottom: 10,
    width: "100%",
    maxHeight: "95%",
  },
  columns: {
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
