import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import CustomButton from "./customButton";

export default function SearchSection({ toggleSearch }) {
  const [searchBook, setSearchBook] = useState(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={searchSection.container}>
      <View
        style={
          isKeyboardVisible ? searchSection.containerTop : searchSection.section
        }
      >
        <View style={searchSection.input}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text style={searchSection.text}>CERCA UN LIBRO </Text>
            <View style={searchSection.icon}>
              <Text onPress={toggleSearch} style={searchSection.close}>
                x
              </Text>
            </View>
          </View>
          <TextInput
            style={searchSection.inputText}
            onChangeText={setSearchBook}
            value={searchBook}
          />
          <View style={{ marginLeft: "50%" }}>
            <CustomButton
              onPress={() => navigation.navigate("ResultPage", searchBook)}
              text={"CERCA"}
              bgButton={"#284B6E"}
              textColor={"white"}
            />
          </View>
        </View>
        <Svg style={{ position: "absolute" }}>
          <Ellipse cx="50%" cy="300" rx="90%" ry="80%" fill="#f5f5f5" />
        </Svg>
      </View>
    </View>
  );
}

const searchSection = StyleSheet.create({
  container: {
    backgroundColor: "rgba(140,140,140,0.7)",
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  containerTop: {
    marginTop: "15%",
    alignItems: "center",
    flexGrow: 1,
  },
  section: {
    marginTop: "60%",
    alignItems: "center",
    flexGrow: 1,
  },
  input: {
    flex: 1,
    padding: 20,
    zIndex: 99,
    marginTop: "20%",
    width: "70%",
  },
  text: {
    marginHorizontal: 20,
    marginVertical: 8,
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#284B6E",
  },
  close: {
    color: "white",
    fontSize: 22,
    marginBottom: 4,
  },
  inputText: {
    padding: 10,
    backgroundColor: "rgb(190,190,190)",
    fontSize: 18,
    borderRadius: 8,
    borderColor: "rgb(140,140,140)",
    borderWidth: 1,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
});
