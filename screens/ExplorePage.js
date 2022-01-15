import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import ExploreOptions from "../components/exploreOptions";
import { exploreData } from "../utils.js";

export default function ExplorePage() {
  return (
    <SafeAreaView style={{ padding: 20, height: "100%" }}>
      <Text style={{ fontSize: 24 }}>Seleziona una categoria</Text>
      <View style={{ alignItems: "center", marginTop: 24 }}>
        <FlatList
          data={exploreData}
          keyExtractor={(item) => item.category}
          numColumns={2}
          renderItem={({ item }) => (
            <ExploreOptions
              category={item.category}
              bgCategory={item.bgCategory}
              imgCategory={item.imgCategory}
              queryParam={item.query}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
