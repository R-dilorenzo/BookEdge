import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/customButton";
import useToggle from "../components/customHook/useToggle";
import SearchSection from "../components/searchSection";

export default function HomePage() {
  const navigate = useNavigation();
  const [search, toggleSearch] = useToggle(false);

  return (
    <SafeAreaView style={{ position: "relative" }}>
      <View style={home.container}>
        <Image source={require("../assets/homeImg.png")} style={home.img} />
        <View style={{ width: "60%" }}>
          <CustomButton
            onPress={() => navigate.navigate("Explore")}
            text={"ESPLORA"}
            bgButton={"#284B6E"}
            textColor={"white"}
          />
          <CustomButton text={"Cerca un libro"} onPress={toggleSearch} />
        </View>
      </View>
      {search && <SearchSection toggleSearch={toggleSearch} />}
    </SafeAreaView>
  );
}

const home = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    height: "100%",
  },
  img: {
    padding: 20,
    height: "70%",
    width: "100%",
    resizeMode: "contain",
  },
});
