import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import ExploreCard from "../components/exploreCard";
import { selectCollection } from "../slices/userSlice";

export default function User() {
  const myCollection = useSelector(selectCollection);

  return (
    <SafeAreaView>
      <View style={userPage.container}>
        <Text style={userPage.title}>Preferiti</Text>
        {myCollection.length > 0 ? (
          <FlatList
            data={myCollection}
            keyExtractor={(item) => item.bookTitle}
            renderItem={({ item }) => (
              <ExploreCard
                title={item.bookTitle}
                author={item.bookAuthor ? item.bookAuthor : null}
                queryParam={item.bookTitle}
              />
            )}
          />
        ) : (
          <Text style={userPage.text}>Nessun libro aggiunto</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const userPage = StyleSheet.create({
    container:{
        height: "100%",
    },
    title:{
        marginHorizontal: 20,
        marginVertical: 20,
        fontSize: 26,
        fontWeight:"bold",
    },
    text:{
        marginHorizontal: 20,
        marginVertical: 8,
        fontSize: 20,
    }
});
