import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ExploreCard from "../components/exploreCard";
import axios, { returnFromQuery } from "../utils";

export default function ExploreResult({ route }) {
  const section = route.params;
  const [response, setResponse] = useState(null);

  useEffect(() => {
    console.log("route.params", route.params);
    async function fetchData(fetchUrl) {
      let request = await axios.get(fetchUrl).then((res) => {
        setResponse(res.data);
      });
      return request;
    }

    fetchData(`/subjects/${route.params}.json`);
  }, []);

  return (
    <>
      {response !== null ? (
        <SafeAreaView style={exploreResult.container}>
          <Text style={exploreResult.text}>
            Hai cercato <Text style={{ fontWeight: "bold" }}>{returnFromQuery(section)}</Text>
          </Text>
          <FlatList
            style={{}}
            data={response.works}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <ExploreCard
                title={item.title}
                author={item.authors[0] ? item.authors[0].name : null}
                queryParam={item.title}
              />
            )}
          />
        </SafeAreaView>
      ) : (
        <View style={[exploreResult.containerLoader, exploreResult.horizontalLoader]}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </>
  );
}

const exploreResult = StyleSheet.create({
  container: {
    height: "100%", //per evitare cut flatlist
  },
  text: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontSize: 24,
  },
  containerLoader: {
    flex: 1,
    justifyContent: "center"
  },
  horizontalLoader: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});
