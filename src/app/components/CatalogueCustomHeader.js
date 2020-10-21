import React, { useState, useEffect } from "react";
import { useStore } from "../config/Store";
import { useTheme, useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Searchbar } from "react-native-paper";
import SwitchSelector from "react-native-switch-selector";
import { ButtonGroup } from "react-native-elements";

export function CatalogueCustomHeader() {
  const { colors, dark } = useTheme();
  const navigation = useNavigation();
  //console.log("nav props", navigation);
  const { state, dispatch } = useStore();

  const options = ["Sku", "Design"];
  const selected = state.indicators.isSortByGroup ? 1 : 0;

  return (
    <View style={styles.parentContainer}>
      <StatusBar barStyle={dark ? "light-content" : "dark-content"} backgroundColor={colors.statusBar} />
      <View style={{ backgroundColor: colors.primary }}>
        <View style={styles.headerTopContentWrapper}>
          <Icon name="menu" size={30} color={colors.accent} onPress={() => navigation.openDrawer()} />
          <View style={styles.titleViewWrapper}>
            <Text
              style={{
                fontSize: 16,
                color: colors.text,
                fontWeight: "bold",
              }}>
              Catalogue
            </Text>
          </View>
          {/* <SwitchSelector
            style={{
              width: 125,
              margin: 5,
              borderRadius: 0,
            }}
            initial={0}
            onPress={(value) => {
              //onChangeGroup(value);
              console.log("group value", value);
            }}
            textColor={colors.accent}
            selectedColor="#fff"
            buttonColor={colors.accent}
            borderColor={colors.accent}
            backgroundColor="transparent"
            hasPadding
            options={[
              {label: "Sku ", value: "sku"},
              {label: "Design ", value: "design"},
            ]}
          /> */}
          <ButtonGroup
            buttons={options}
            selectedIndex={selected}
            containerStyle={{
              flex: 0.8,
              borderColor: colors.accent,
              borderWidth: 1,
              borderRadius: 10,
              backgroundColor: "transparent",
            }}
            buttonStyle={{ margin: 2 }}
            selectedButtonStyle={{ backgroundColor: colors.accent, borderRadius: 8 }}
            innerBorderStyle={{ color: "transparent" }}
            onPress={(index) => {
              if (index == 0) {
                dispatch({ type: "SET_SORT_FLAG", payload: false });
              } else {
                dispatch({ type: "SET_SORT_FLAG", payload: true });
              }
            }}
          />
          <Icon name="filter-outline" size={30} color={colors.accent} onPress={() => navigation.navigate("filter")} />
        </View>
        <View style={styles.headerBottomContentWrapper}>
          <Searchbar
            style={[
              styles.searchStyle,
              {
                borderColor: dark ? colors.border : colors.accent,
              },
            ]}
            placeholder="Search Products"
            onChangeText={() => console.log("searching..")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parentContainer: { width: "100%" },
  headerTopContentWrapper: {
    flexDirection: "row",
    margin: 10,
    alignItems: "center",
  },
  headerBottomContentWrapper: { margin: 10 },
  titleViewWrapper: { flex: 1, marginStart: 10, marginEnd: 10 },
  searchStyle: {
    borderRadius: 5,
    borderWidth: 0.5,
    elevation: 4,
  },
});
