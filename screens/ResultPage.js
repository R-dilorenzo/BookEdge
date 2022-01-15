import React, { useEffect, useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  FlatList,
  Image,
  LogBox,
  SafeAreaView,
  ScrollView,
  SectionList,
  VirtualizedList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import Svg, { Circle, Ellipse } from "react-native-svg";
import CustomAccordion from "../components/customAccordion";
import useToggle from "../components/customHook/useToggle";
import axios from "../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCollection,
  ADD_TO_COLLECTION,
  REMOVE_FROM_COLLECTION,
} from "../slices/userSlice";
import { TouchableOpacity } from "react-native-gesture-handler";
import useFetch from "../components/customHook/useFetch";

export default function ResultPage({ route }) {
  const routeParam = route.params;
  const [responseDetails, setResponseDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [responseImage, setResponseImage] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const imageRef = useRef(null);
  const dispatch = useDispatch();
  const collection = useSelector(selectCollection);

  const {
    data: response,
    loading: loadingResponse,
    error: errorRepsponse,
  } = useFetch(`/search.json?q=${route.params}`);

  useEffect(() => {
    //remove flatlist warning
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const getImageCover = async (url) => {
    setLoadingImage(true);

    console.log("url =>", url);
    let requestImage = await axios
      .get(`https://openlibrary.org/api/books?bibkeys=ISBN:${url}&format=json`)
      .then((res) => {
        let firstKeyObj = Object.keys(res.data)[0];

        if (res.data[firstKeyObj].hasOwnProperty("thumbnail_url")) {
          if (
            res.data[firstKeyObj].thumbnail_url != null &&
            res.data[firstKeyObj].thumbnail_url != undefined
          ) {
            //default value of thumbnail_url has -S => small image
            //replace url with fetch a Large image
            let replaceUrl = res.data[firstKeyObj].thumbnail_url.replace(
              "-S",
              "-L"
            );
            setResponseImage(replaceUrl);
          } else {
            setResponseImage("coverBookNotFound");
          }
        } else {
          setResponseImage("coverBookNotFound");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingImage(false));

    return requestImage;
  };

  const getDetailBooks = async (keyBook) => {
    setLoadingDetails(true);

    let requestImage = await axios
      .get(`https://openlibrary.org${keyBook}.json`)
      .then((res) => {
        if (res.data != null) {
          setResponseDetails(res.data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingDetails(false));

    return requestImage;
  };

  useEffect(() => {
    //get cover
    response != null
      ? response.docs[0].isbn && getImageCover(response.docs[0].isbn[0])
      : null;
    //get more info about book
    response != null ? getDetailBooks(response.docs[0].key) : null;
  }, [response]);

  const getSubText = (text, string) => {
    let indexString = text.indexOf(string);
    return text.substring(0, indexString);
  };

  const returnDescription = () => {
    if (responseDetails === null) return "no description found...";
    if (!!responseDetails.description && responseDetails.description.value) {
      if (responseDetails.description.value.includes("---------")) {
        return getSubText(responseDetails.description.value, "---------")
      } else return responseDetails.description.value;
    } else if (responseDetails.description) return responseDetails.description;
    else return "no description found...";
  };

  const addBook = () => {
    dispatch(
      ADD_TO_COLLECTION({
        item: {
          bookTitle: routeParam,
          bookAuthor: response.docs[0].author_name
            ? response.docs[0].author_name[0]
            : null,
        },
      })
    );
  };

  const removeBook = () => {
    dispatch(
      REMOVE_FROM_COLLECTION({
        bookTitle: routeParam,
      })
    );
  };

  return (
    <>
      {response !== null &&
      responseImage !== null &&
      responseDetails != null ? (
        <SafeAreaView style={resultPage.container}>
          <ScrollView>
            <View style={{ width: "100%" }}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Svg style={{ position: "absolute" }}>
                  <Ellipse cx="50%" cy="55" rx="100%" ry="83%" fill="#284b6e" />
                </Svg>
                {responseImage === "coverBookNotFound" ? (
                  <Image
                    ref={imageRef}
                    style={resultPage.cover}
                    source={require("../assets/coverNotFound.png")}
                  />
                ) : (
                  <Image
                    ref={imageRef}
                    style={resultPage.cover}
                    source={{
                      uri: responseImage,
                    }}
                  />
                )}
                <View style={{ width: "50%" }}>
                  <Text
                    style={{
                      ...resultPage.text,
                      ...resultPage.bold,
                      ...resultPage.white,
                    }}
                  >
                    {routeParam}
                  </Text>
                  {responseDetails && (
                    <Text style={resultPage.date}>
                      {responseDetails.first_publish_date
                        ? responseDetails.first_publish_date
                        : null}
                    </Text>
                  )}

                  <View style={resultPage.addIconWrapper}>
                    {collection.findIndex(
                      (el) => el.bookTitle === routeParam
                    ) === -1 ? (
                      //libro non presente
                      <TouchableOpacity onPress={addBook}>
                        <MaterialIcons
                          name="bookmark"
                          size={32}
                          style={resultPage.addIcon}
                        />
                      </TouchableOpacity>
                    ) : (
                      //libro presente
                      <TouchableOpacity onPress={removeBook}>
                        <MaterialIcons
                          name="bookmark"
                          size={32}
                          style={resultPage.removeIcon}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
              <View
                style={{
                  alignItems: "flex-start",
                  flex: 1,
                  marginHorizontal: 20,
                }}
              >
                <Text
                  style={{
                    ...resultPage.text,
                    ...resultPage.label,
                    ...resultPage.bold,
                  }}
                >
                  {response.docs[0].author_name &&
                    response.docs[0].author_name[0]}
                </Text>
                <CustomAccordion title={"Description"}>
                  <Text style={resultPage.description}>
                    {returnDescription()}
                  </Text>
                </CustomAccordion>
                <CustomAccordion title={"Characters"}>
                  {responseDetails.subject_people ? (
                    <FlatList
                      data={responseDetails.subject_people}
                      style={{ flexGrow: 0 }}
                      keyExtractor={(item) => item}
                      renderItem={({ item, index }) => (
                        <Text key={index} style={resultPage.description}>{item}</Text>
                      )}
                    />
                  ) : (
                    // ? <Text>{responseDetails.subject_people.map(item => console.log(item)) }</Text>
                    <Text style={resultPage.description}>
                      Characters not found...
                    </Text>
                  )}
                </CustomAccordion>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      ) : 
      <View style={[resultPage.containerLoader, resultPage.horizontalLoader]}>
        <ActivityIndicator size="large" />
      </View>
      }
    </>
  );
}

const resultPage = StyleSheet.create({
  container: {
    height: "100%", //per evitare cut flatlist
  },
  text: {
    marginHorizontal: 20,
    marginVertical: 8,
    fontSize: 26,
  },
  cover: {
    marginLeft: 20,
    width: "45%",
    height: 300,
    resizeMode: "contain",
    marginBottom: 40,
  },
  bold: {
    fontWeight: "bold",
  },
  description: {
    fontSize: 18,
    marginBottom: 8,
  },
  date: {
    marginHorizontal: 20,
    fontSize: 16,
    opacity: 0.5,
    color: "white",
  },
  label: {
    fontSize: 22,
  },
  linkText: {
    color: "#597087",
    fontSize: 16,
    fontWeight: "bold",
  },
  white: {
    color: "white",
  },
  addIconWrapper: {
    marginHorizontal: 20,
    marginVertical: 20,
    width: 70,
  },
  addIcon: {
    padding: 8,
    backgroundColor: "white",
    borderRadius: 8,
    marginLeft: 20,
    color: "gray",
  },
  removeIcon: {
    padding: 8,
    backgroundColor: "white",
    borderRadius: 8,
    marginLeft: 20,
    color: "#f54738",
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
