import React, { useState, useEffect } from "react";
import { useDeviceOrientation } from "@react-native-community/hooks";
import { isTablet, isPhone } from "react-native-device-detection";
import { useTheme, useNavigation } from "@react-navigation/native";
import { SafeAreaView, View, Text, StyleSheet, ScrollView, ImageBackground } from "react-native";
import { Title, Subheading, TextInput, HelperText } from "react-native-paper";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Login() {
  const navigation = useNavigation();
  const orientation = useDeviceOrientation();
  const { colors, dark } = useTheme();
  const [loading, setLoading] = useState(false);
  const [secureEntry, setSecureEntry] = useState(true);

  //Error States
  const [errorEmail, setEmailError] = useState(false);
  const [errorPWD, setPWDError] = useState(false);
  const [errorLicense, setLicenseError] = useState(false);
  const [errorDevice, setDeviceError] = useState(false);

  //State Code
  const [login, setLogin] = useState({
    email: "",
    password: "",
    licenseKey: "",
    deviceName: "",
  });

  const InputTheme = {
    colors: {
      placeholder: colors.accent,
      primary: colors.accent,
      error: "red",
    },
  };

  function MobileContent() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.accent,
        }}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}></View>
        <View style={{ flex: 3, justifyContent: "center" }}>
          {/**Main Content */}
          <View style={[styles.content, { backgroundColor: colors.primary }]}>
            <View style={{ flex: 1 }}>
              {/**For Header */}
              {Header()}
            </View>
            <View style={{ flex: 5 }}>
              {/**For Main Content */}
              <ScrollView style={{ flex: 1 }}>{LoginContent()}</ScrollView>
            </View>
            <View style={{ flex: 1 }}>
              {/**For Login Button */}
              {Footer()}
            </View>
          </View>
        </View>
      </View>
    );
  }

  function TabContent() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.accent,
          flexDirection: orientation.landscape ? "row" : "column",
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}></View>
        <View style={{ flex: 1.5, justifyContent: "center" }}>
          {/**Main Content */}
          <View style={[styles.content, { backgroundColor: colors.primary }]}>
            {/**Header Wrapper */}
            <View style={{ justifyContent: "center" }}>
              {/**Header Title */}
              {Header()}
            </View>
            {/**Content Wrapper */}
            {LoginContent()}
            {/**Footer Wrapper */}
            <View style={{ justifyContent: "center" }}>
              {/** Login Button */}
              {Footer()}
            </View>
          </View>
        </View>
      </View>
    );
  }

  function Header() {
    return (
      <View style={{ margin: "5%" }}>
        <Title>Welcome User</Title>
        <Subheading>Please Sign In to Continue..</Subheading>
      </View>
    );
  }

  function Footer() {
    return (
      <View style={{ margin: isTablet ? "5%" : "3.5%" }}>
        <Button
          title="Login"
          loading={false}
          containerStyle={{
            maxWidth: isTablet ? "45%" : "100%",
            //marginStart: isTablet ? 25 : 10,
            //marginEnd: isTablet ? 25 : 10,
          }}
          buttonStyle={{ height: 50, borderRadius: 10 }}
          linearGradientProps={{
            colors: [colors.accent, colors.accentLight],
            start: { x: 1, y: 1 },
            end: { x: 1, y: 0 },
          }}
          onPress={() => navigation.navigate("verify")}
        />
      </View>
    );
  }

  function LoginContent() {
    return (
      <View style={{ margin: "3%" }}>
        {/**Login & Email Wrapper */}
        <View style={{ flexDirection: isTablet ? "row" : "column" }}>
          <View style={styles.input}>
            <TextInput mode="outlined" label="Email" error={errorEmail} theme={InputTheme} />
            {errorEmail ? (
              <HelperText visible={true} type="error">
                Invalid Email Address
              </HelperText>
            ) : null}
          </View>
          <View style={styles.input}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                mode="outlined"
                label="Password"
                error={errorPWD}
                theme={InputTheme}
                secureTextEntry={secureEntry}
                style={{ flex: 1, marginBottom: 5, marginEnd: isTablet ? 15 : 5 }}
              />
              <Button
                icon={
                  <Icon
                    name={secureEntry ? "eye-off-outline" : "eye-outline"}
                    size={30}
                    color={colors.primary}
                  />
                }
                buttonStyle={{
                  width: 55,
                  aspectRatio: 1,
                  backgroundColor: colors.accent,
                  borderRadius: 10,
                }}
                containerStyle={{ marginStart: 5 }}
                onPress={async () => setSecureEntry(!secureEntry)}
              />
            </View>
            {errorPWD ? (
              <HelperText visible={true} type="error">
                Invalid Password
              </HelperText>
            ) : null}
          </View>
        </View>
        {/**License & Device Wrapper */}
        <View style={{ flexDirection: isTablet ? "row" : "column" }}>
          <View style={styles.input}>
            <TextInput
              mode="outlined"
              label="License Key"
              error={errorLicense}
              theme={InputTheme}
            />
            {errorLicense ? (
              <HelperText visible={true} type="error">
                Invalid License Key
              </HelperText>
            ) : null}
          </View>
          <View style={styles.input}>
            <TextInput mode="outlined" label="Device Name" error={errorDevice} theme={InputTheme} />
            {errorDevice ? (
              <HelperText visible={true} type="error">
                Device Name cannot be empty
              </HelperText>
            ) : null}
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {isTablet ? TabContent() : MobileContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    flex: isTablet ? 0 : 1,
    margin: isTablet ? "8%" : "5%",
    justifyContent: "center",
    borderRadius: 25,
  },
  input: {
    flex: 1,
    margin: 5,
    marginStart: isTablet ? 20 : 10,
    marginEnd: isTablet ? 20 : 10,
  },
});
