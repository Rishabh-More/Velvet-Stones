import React, { useEffect, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-elements";
import ToggleSwitch from "toggle-switch-react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { generateCatalogueLink } from "../api/ApiService";

export default function LinkOptions() {
  const navigation = useNavigation();
  const { colors, dark } = useTheme();

  //State Codes
  const [enable, setEnable] = useState(false);
  const [temp, setTemp] = useState({
    name: "Diva 10",
    category: "RINGS",
  });
  const [link, setLink] = useState({
    name: "",
    designNumbers: {
      designNumber: [], //List of Design. Yes!! Ik it's weird
    },
    otpEnabled: 0,
    otpValidity: 2,
    shopId: 115,
  });

  useEffect(() => {
    console.log("link object", link);
  }, [link]);

  useEffect(() => {
    console.log("temp object", temp);
  }, [temp]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ margin: 30 }}>
          <View style={{ flexDirection: "column" }}>
            <TextInput
              mode="outlined"
              label="Link Name (required)"
              theme={{
                colors: {
                  placeholder: colors.accent,
                  primary: colors.accent,
                  background: colors.primary,
                },
              }}
              value={link.name}
            />
            {/* <CheckBox center title="Enable OTP?" checked={true} checkedColor={colors.accent} /> */}
            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <ToggleSwitch
                isOn={link.otpEnabled == 1 ? true : false}
                onColor={colors.accent}
                size="medium"
                label="Enable OTP?"
                labelStyle={{ color: colors.text, fontSize: 16 }}
                onToggle={() => {
                  let enable = link.otpEnabled == 1 ? 0 : 1;
                  console.log("enable is", enable);
                  setLink({ ...link, otpEnabled: enable });
                }}
              />
            </View>
          </View>
          {link.otpEnabled ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text style={{ color: colors.text, fontSize: 16 }}>
                OTP for generated link will expire in:{" "}
              </Text>
              <DropDownPicker
                placeholder="Pick a Duration"
                items={[
                  { label: "1 Hour", value: 1 },
                  { label: "2 Hours", value: 2 },
                  { label: "4 Hours", value: 4 },
                  { label: "8 Hours", value: 8 },
                  { label: "12 Hours", value: 12 },
                ]}
                defaultValue={link.otpValidity}
                containerStyle={{ height: 50, flex: 1 }}
                style={{ backgroundColor: colors.primary, borderColor: colors.border }}
                dropDownStyle={{ backgroundColor: colors.primary, borderColor: colors.border }}
                labelStyle={{ color: colors.text }}
                selectedLabelStyle={{ color: colors.text }}
                activeItemStyle={{ backgroundColor: colors.accentLight }}
                arrowColor={colors.text}
                onChangeItem={(item) => setLink({ ...link, otpValidity: item.value })}
              />
            </View>
          ) : null}
        </View>
      </View>
      <View>
        <Button
          title="Generate Link"
          buttonStyle={{ backgroundColor: colors.accent, height: 50, borderRadius: 15 }}
          containerStyle={{ margin: 10 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
