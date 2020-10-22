import React from "react";
import { useDeviceOrientation } from "@react-native-community/hooks";
import { useTheme } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { Card, Title } from "react-native-paper";
import { Button } from "react-native-elements";
const CatalogueLinkItem = ({ link }) => {
  const orientation = useDeviceOrientation();
  const { colors, dark } = useTheme();
  return (
    <Card style={styles.container}>
      <View style={styles.content}>
        <View style={styles.info}>
          <Title style={{ margin: 10 }}>{link.name}</Title>
          <Text style={{ margin: 10, color: colors.text }} numberOfLines={1}>
            Link: {link.catalogueUrl}
          </Text>
          <View
            style={{
              margin: 5,
              marginBottom: 10,
              height: 50,
              borderColor: link.otp != null ? colors.accent : "grey",
              backgroundColor: link.otp != null ? "transparent" : "rgba(128, 128, 128, 0.1)",
              borderRadius: 15,
              borderWidth: 0.5,
            }}>
            {link.otp != null ? (
              <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    flex: 1,
                    marginStart: 10,
                    marginEnd: 10,
                    fontSize: 16,
                    fontWeight: "900",
                    color: colors.text,
                  }}>
                  OTP: <Text style={{ color: colors.accent }}>{link.otp}</Text>
                </Text>
                <Button
                  buttonStyle={{ backgroundColor: colors.accent }}
                  containerStyle={{ margin: 5, borderRadius: 10 }}
                  title="Regenerate OTP"
                />
              </View>
            ) : null}
          </View>
        </View>
        <View style={styles.buttons}>
          <Button
            title="Share"
            type="outline"
            titleStyle={{ color: colors.accent }}
            buttonStyle={{ borderColor: colors.accent, height: 50, borderRadius: 15 }}
            containerStyle={{ margin: 5, height: 50 }}
          />
          <Button
            title="Expire Link"
            type="outline"
            titleStyle={{ color: colors.accent }}
            buttonStyle={{ borderColor: colors.accent, height: 50, borderRadius: 15 }}
            containerStyle={{ margin: 5 }}
          />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    borderRadius: 15,
    elevation: 3,
  },
  content: {
    //height: 200,
    flexDirection: "row",
  },
  info: {
    flex: 2,
    justifyContent: "space-evenly",
  },
  buttons: {
    flex: 1,
    justifyContent: "space-evenly",
  },
});

export default CatalogueLinkItem;
