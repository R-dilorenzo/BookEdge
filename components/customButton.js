import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CustomButton({
  onPress = () => {},
  text,
  bgButton,
  textColor,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          marginVertical: 8,
          paddingHorizontal: 20,
          paddingVertical: 14,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 25,
          backgroundColor: bgButton,
          borderWidth: bgButton ? null : 1,
          borderColor: bgButton ? null : "black",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            color: textColor ? textColor : "black",
          }}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
