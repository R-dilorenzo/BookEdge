import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useToggle from "./customHook/useToggle";

export default function CustomAccordion({ title, children }) {
  const [value, toggleValue] = useToggle(false);

  return (
    <>
      <TouchableOpacity onPress={toggleValue} style={accordion.wrapper}>
        <View
          style={
            value ? accordion.buttonWrapperFalse : accordion.buttonWrapperTrue
          }
        >
          <Text
            style={{ ...accordion.title, ...(value && { color: "black" }) }}
          >
            {title}
          </Text>
        </View>
      </TouchableOpacity>
      {value && (
        <TouchableOpacity
          style={accordion.wrapper}
          activeOpacity={0.8}
          onPress={toggleValue}
          style={{ zIndex: -1 }}
        >
          <View style={accordion.textWrapper}>{children}</View>
        </TouchableOpacity>
      )}
    </>
  );
}

const accordion = StyleSheet.create({
  wrapper: {
    marginVertical: 16,
  },
  buttonWrapperTrue: {
    zIndex: 1,
    marginLeft: 20,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: "#284B6E",
  },
  buttonWrapperFalse: {
    zIndex: 1,
    marginLeft: 20,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: "white",
    borderColor: "#284B6E",
    borderWidth: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  textWrapper: {
    transform: [{ translateY: -30 }],
    borderWidth: 1,
    borderColor: "#284B6E",
    borderRadius: 8,
    padding: 24,
    paddingTop: 44,
    paddingBottom: 0,
    minWidth: "75%",
  },
});
