import React, { useContext } from "react";
import { View, Button } from "react-native";
import { UnitContext } from "../components/unitContext";

const SettingsScreen = () => {
  const { unit, toggleUnit } = useContext(UnitContext);

  return (
    <View>
      <Button
        title={`Switch to ${unit === "metric" ? "Fahrenheit" : "Celsius"}`}
        onPress={toggleUnit}
      />
    </View>
  );
};

export default SettingsScreen;
