import React from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Header({ navigation, title, arrowBack }) {
  const openMenu = () => {
    //passo la navigation attraverso stack e utilizzo openDraper per aprire la sidebar (drawer navigation)
    navigation.openDrawer();
  };

  return (
    <View style={styles.header}>
      {arrowBack && (
        <MaterialIcons
          name="arrow-back"
          size={28}
          onPress={() => navigation.goBack()}
          style={styles.icon}
        />
      )}
      {/* icon per menu */}
      <MaterialIcons
        name="menu"
        size={28}
        onPress={openMenu}
        style={styles.iconRight}
      />
      <View style={styles.headerTitle}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 1,
    color: "white",
  },
  icon: {
    position: "absolute",
    left: 16,
    // right: 0,
    color: "white",
  },
  iconRight: {
    position: "absolute",
    color: "white",
    right: 0,
  },
  headerTitle: {
    flexDirection: "row",
    color: "white",
  },
});
