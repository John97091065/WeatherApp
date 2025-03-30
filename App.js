import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';
import React, { useEffect, useState } from "react";
import { UnitProvider } from "./src/components/unitContext";
import * as SplashScreen from 'expo-splash-screen';
import Navbar from "./src/components/Navbar";

const App = () => {

  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync(); // Keep the splash screen visible
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate loading (e.g., fetching data)
      setAppReady(true);
      await SplashScreen.hideAsync(); // Hide the splash screen
    }

    prepare();
  }, []);

  if (!appReady) {

    return (
      <View style={styles.splashContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading Weather...</Text>
      </View>
    );
  }

  return (
    <UnitProvider>
      {/* <StatusBar style="auto" /> */}
      <Navbar />
    </UnitProvider>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;