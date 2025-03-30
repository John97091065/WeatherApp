import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/AboutScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { Ionicons } from "react-native-vector-icons"; // Install react-native-vector-icons if needed
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get("window");

const Navbar = () => {
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const handleGesture = (event) => {
    translateX.value = withSpring(event.nativeEvent.translationX);
  };

  return (
    <NavigationContainer>
      <GestureHandlerRootView onGestureEvent={handleGesture}>
        <Animated.View style={[{ padding: 1, flex: 1, flexDirection: "row" }, animatedStyle]}>
          <View style={styles.Navhead}>

            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                  let iconName;
                  if (route.name === "Home") iconName = "home";
                  else if (route.name === "About") iconName = "information-circle";
                  else if (route.name === "Settings") iconName = "settings";
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#00c80c",
                tabBarInactiveTintColor: "gray",
              })}
            >
              <Tab.Screen name="Home" component={HomeScreen} style={styles.NavIcon } />
              <Tab.Screen name="About" component={AboutScreen} style={styles.NavIcon } />
              <Tab.Screen name="Settings" component={SettingsScreen} style={styles.NavIcon } />
            </Tab.Navigator>
            
          </View>
        </Animated.View>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({
  Navhead: {
    width: "100%",
    padding: 0,
    
  },

  NavIcon: {
    padding: 0,
  },
});
export default Navbar;