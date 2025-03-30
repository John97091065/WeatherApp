import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";

const AboutScreen = () => (
  <View>
    <Text style={styles.text}>© 2025 John Hodge. Alle rechten voorbehouden.</Text>
  </View>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
  },
});
export default AboutScreen;
