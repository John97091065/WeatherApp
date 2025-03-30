import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UnitContext = createContext();

export const UnitProvider = ({ children }) => {
  const [unit, setUnit] = useState("metric");

  useEffect(() => {
    const loadUnit = async () => {
      const savedUnit = await AsyncStorage.getItem("unit");
      if (savedUnit) setUnit(savedUnit);
    };
    loadUnit();
  }, []);

  const toggleUnit = async () => {
    const newUnit = unit === "metric" ? "imperial" : "metric";
    setUnit(newUnit);
    await AsyncStorage.setItem("unit", newUnit);
  };

  return (
    <UnitContext.Provider value={{ unit, toggleUnit }}>
      {children}
    </UnitContext.Provider>
  );
};
