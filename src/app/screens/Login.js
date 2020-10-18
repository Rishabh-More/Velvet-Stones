import React, { useState, useEffect } from "react";
import useDeviceOrientation from "@react-native-community/hooks";
import { isTablet, isPhone } from "react-native-device-detection";
import { useTheme, useNavigation } from "@react-navigation/native";
import { SafeAreaView, View, Text, StyleSheet, ImageBackground } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Login() {
  const navigation = useNavigation();
  const { colors, dark } = useTheme();
  const [secureEntry, setSecureEntry] = useState(true);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    license: false,
    device: false,
  });
  console.log("errors", errors);
  const onChangeText = (text) => hasErrors(text);

  const displayPassword = () => {
    setSecureEntry(!secureEntry);
  };

  const hasErrors = (text) => {
    // if (text.length == 0) {
    //   setErrors({ email: false });
    // } else if (text.includes("@")) {
    //   setErrors({ email: false });
    // } else {
    //   setErrors({ email: true });
    // }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.accentDark }]}>
      <ImageBackground source={require("../res/assets/login_cover_background.jpg")} style={{ flex: 1 }}>
        <View style={{ flex: 1 }} />
        <View
          style={{
            flex: 2,
            backgroundColor: "#fff",
            margin: 15,
            marginBottom: 30,
            borderRadius: 25,
          }}>
          <View style={{ flex: 1, marginTop: 30, margin: 15 }}>
            <Text style={{ fontSize: 25, fontWeight: "900" }}>Welcome Fashionista!</Text>
            <Text style={{ marginTop: 10, marginBottom: 10 }}>Sign in to Continue</Text>
          </View>
          <View style={{ margin: 1 }}>
            <Input
              placeholder="Email"
              containerStyle={{ marginTop: 5, marginBottom: 5 }}
              inputContainerStyle={{
                borderColor: colors.accent,
                borderStartWidth: 1,
                borderTopWidth: 1,
                borderEndWidth: 1,
                borderBottomWidth: 2,
                borderRadius: 10,
              }}
              leftIcon={<Icon name="email-outline" size={24} color={colors.accent} style={{ marginStart: 5 }} />}
              errorMessage={errors.email ? "Email Address is invalid!" : null}
              renderErrorMessage={true}
              onChangeText={onChangeText}
            />
          </View>
          <View style={{ margin: 1 }}>
            <Input
              placeholder="Password"
              containerStyle={{ marginTop: 5, marginBottom: 5 }}
              inputContainerStyle={{
                borderColor: colors.accent,
                borderStartWidth: 1,
                borderTopWidth: 1,
                borderEndWidth: 1,
                borderBottomWidth: 2,
                borderRadius: 10,
              }}
              leftIcon={<Icon name="lock-outline" size={24} color={colors.accent} style={{ marginStart: 5 }} />}
              rightIcon={
                <Icon
                  name={secureEntry ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color={colors.accent}
                  style={{ marginEnd: 5 }}
                  onPress={() => displayPassword()}
                />
              }
              secureTextEntry={secureEntry}
              errorMessage={errors.password ? "Password should be more than 3 characters" : null}
              renderErrorMessage={true}
              onChangeText={onChangeText}
            />
          </View>
          <View style={{ margin: 1 }}>
            <Input
              placeholder="License Key"
              containerStyle={{ marginTop: 5, marginBottom: 5 }}
              inputContainerStyle={{
                borderColor: colors.accent,
                borderStartWidth: 1,
                borderTopWidth: 1,
                borderEndWidth: 1,
                borderBottomWidth: 2,
                borderRadius: 10,
              }}
              leftIcon={<Icon name="shield-key-outline" size={24} color={colors.accent} style={{ marginStart: 5 }} />}
              errorMessage={errors.license ? "License must not be Empty" : null}
              renderErrorMessage={true}
              onChangeText={onChangeText}
            />
          </View>
          <View style={{ marginBottom: 5 }}>
            <Input
              placeholder="Device Name"
              containerStyle={{ marginTop: 5 }}
              inputContainerStyle={{
                borderColor: colors.accent,
                borderStartWidth: 1,
                borderTopWidth: 1,
                borderEndWidth: 1,
                borderBottomWidth: 2,
                borderRadius: 10,
              }}
              leftIcon={<Icon name="devices" size={24} color={colors.accent} style={{ marginStart: 5 }} />}
              errorMessage={errors.device ? "Device name can't be empty!" : null}
              renderErrorMessage={true}
              onChangeText={onChangeText}
            />
          </View>
          <View>
            <Button
              title="Login"
              loading={false}
              buttonStyle={{ height: 50, margin: 10, borderRadius: 25 }}
              linearGradientProps={{
                colors: [colors.accentDark, colors.accent],
                start: { x: 1, y: 1 },
                end: { x: 1, y: 0 },
              }}
              onPress={() => navigation.navigate("verify")}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    //alignItems: "center",
  },
});
