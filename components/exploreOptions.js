import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ExploreOptions({
  category,
  imgCategory,
  queryParam,
  bgCategory,
}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ExploreResult", queryParam)}
      style={{
        margin: 16,
        borderRadius: 8,
        // width: 160,
        // backgroundColor: "black",
        alignItems: "center",
      }}
    >
      <Image
        source={imgCategory}
        style={{
          height: 60,
          width: 60,
          resizeMode: "cover",
          position: "absolute",
        }}
      />
      <View
        style={{
          backgroundColor: bgCategory,
          width: 160,
          marginTop: 24,
          paddingTop: 48,
          padding: 24,
          borderRadius: 8,
          zIndex: -1,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            color: "white",
          }}
        >
          {category}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
