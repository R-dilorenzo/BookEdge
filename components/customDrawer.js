import { DrawerItemList } from "@react-navigation/drawer";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function CustomDrawer(props) {
  return (
    <ScrollView>
      <View
        style={{
          marginTop: 70,
          marginBottom: 20,
          padding: 10,
          backgroundColor:
            " linear-gradient(75.99deg, rgba(40, 75, 110, 0.308) 47.96%, rgba(124, 179, 234, 0.154) 86.58%);",
          borderColor: "#284B6E",
          borderTopWidth: 2,
          borderBottomWidth: 2,
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            source={require("../assets/logoBookEdge.png")}
            style={{ width: "100%", height: 100 }}
          />
        </View>
      </View>

      <DrawerItemList {...props} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
