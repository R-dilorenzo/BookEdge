import React from "react";
import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
//import il provider per wrappare applicazione con redux
import { Provider } from "react-redux";
import { store } from "./store";
//import per react navigator
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import User from "./screens/User";
import HomePage from "./screens/HomePage";
import Header from "./components/header";
import ExplorePage from "./screens/ExplorePage";
import ExploreResult from "./screens/ExploreResult";
import ResultPage from "./screens/ResultPage";
import CustomDrawer from "./components/customDrawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function StackNavigationHome() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#284B6E",
          height: 90,
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={({ navigation }) => ({
          headerTintColor: "white",
          //passo la funzione per poter utilizzare la prop navigation nel component Header (header,non fa parte di stack navigation)
          headerTitle: () => (
            <Header navigation={navigation} title="Book Edge" />
          ),
        })}
      />
      <Stack.Screen
        name="Explore"
        component={ExplorePage}
        options={({ navigation }) => ({
          headerTintColor: "white",
          headerLeft: () => null,
          //passo la funzione per poter utilizzare la prop navigation nel component Header
          headerTitle: () => (
            <Header navigation={navigation} title="Esplora" arrowBack />
          ),
        })}
      />
      <Stack.Screen
        name="ExploreResult"
        component={ExploreResult}
        options={({ navigation }) => ({
          headerTintColor: "white",
          headerLeft: () => null,
          //passo la funzione per poter utilizzare la prop navigation nel component Header
          headerTitle: () => (
            <Header
              navigation={navigation}
              title="Risultati"
              arrowBack
            />
          ),
        })}
      />
      <Stack.Screen
        name="ResultPage"
        component={ResultPage}
        options={({ navigation }) => ({
          headerTintColor: "white",
          headerLeft: () => null,
          //passo la funzione per poter utilizzare la prop navigation nel component Header
          headerTitle: () => (
            <Header 
              navigation={navigation} 
              title="" 
              arrowBack 
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function StackNavigationUser() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#284B6E",
          height: 90,
        },
      }}
    >
      <Stack.Screen
        name="User"
        component={User}
        options={({ navigation }) => ({
          //passo la funzione per poter utilizzare la prop navigation nel component header che non fa parte di stack navigation
          headerTitle: () => (
            <Header navigation={navigation} title="Profilo" />
          ),
        })}
      />
      <Stack.Screen
        name="ResultPage"
        component={ResultPage}
        options={({ navigation }) => ({
          headerTintColor: "white",
          headerLeft: () => null,
          //passo la funzione per poter utilizzare la prop navigation nel component Header
          headerTitle: () => (
            <Header navigation={navigation} title="Result Page" arrowBack />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    //wrappo app con provider di redux come data layer e imposto quindi lo store (./store.js)
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Drawer.Navigator
            // drawerStyle={{ width: '60%' }}
            drawerContentOptions={{
              activeBackgroundColor: "#284B6E",
              activeTintColor: "white",
              // itemStyle:{marginTop:20},
              labelStyle: {
                fontSize: 18,
                fontWeight: "bold",
              },
            }}
            drawerContent={(props) => <CustomDrawer {...props} />}
          >
            <Drawer.Screen
              name="Home"
              component={StackNavigationHome}
              options={{
                drawerIcon: (config) => (
                  <MaterialCommunityIcons
                    name="home"
                    color={config.color}
                    size={config.size}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="User"
              component={StackNavigationUser}
              options={{
                drawerLabel: "Profilo",
                drawerIcon: (config) => (
                  <MaterialCommunityIcons
                    name="account"
                    color={config.color}
                    size={config.size}
                  />
                ),
              }}
            />
          </Drawer.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
