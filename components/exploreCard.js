import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

export default function ExploreCard({ title, author, queryParam }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ResultPage", queryParam)}
      style={{
        margin: 24,
        borderRadius: 16,
        backgroundColor: "#C8C8C8",
        marginVertical: 16,
      }}
    >
      <View
        style={{
          padding: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "100%",
        }}
      >
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text
            style={{
              fontWeight: "700",
              color: "black",
              fontSize: 20,
              flex: 1,
              marginRight: 8,
            }}
          >
            {title}
          </Text>
          <Text style={{ fontSize: 16 }}>{author}</Text>
        </View>
        <MaterialIcons
          name="east"
          size={24}
          color="white"
          style={{ padding: 12, backgroundColor: "black", borderRadius: 100 }}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
