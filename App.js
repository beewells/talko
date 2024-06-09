// App.js
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

import Header from "./assets/components/Header";
import TitleScreen from "./assets/components/TitleScreen";
import Welcome from "./assets/components/Welcome";
import NewPost from "./assets/components/NewPost";
import Home from "./assets/components/Home";
import FoodDetail from "./assets/components/FoodDetail";
import Profile from "./assets/components/Profile";
import MenuScreen from "./assets/components/MenuScreen";
import Onboarding from "./assets/components/Onboarding";
const Stack = createNativeStackNavigator();

const ScreenWithHeader = (Component) => (props) =>
  (
    <View style={styles.container}>
      <Header />
      <Component {...props} />
    </View>
  );

export default function App() {
  const [fontsLoaded] = useFonts({
    Modak: require("./assets/fonts/Modak-Regular.ttf"),
    Black: require("./assets/fonts/Inter-Black.ttf"),
    Bold: require("./assets/fonts/Inter-Bold.ttf"),
    ExtraBold: require("./assets/fonts/Inter-ExtraBold.ttf"),
    ExtraLight: require("./assets/fonts/Inter-ExtraLight.ttf"),
    Light: require("./assets/fonts/Inter-Light.ttf"),
    Medium: require("./assets/fonts/Inter-Medium.ttf"),
    Regular: require("./assets/fonts/Inter-Regular.ttf"),
    SemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    Thin: require("./assets/fonts/Inter-Thin.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Title"
          component={TitleScreen}
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen
          name="MenuScreen"
          component={ScreenWithHeader(MenuScreen)}
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen
          name="Home"
          component={ScreenWithHeader(Home)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ScreenWithHeader(Profile)}
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen
          name="FoodDetail"
          component={ScreenWithHeader(FoodDetail)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewPost"
          component={ScreenWithHeader(NewPost)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false, animationEnabled: false }}
        />

  <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{ headerShown: false, animationEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
