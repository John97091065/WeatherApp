import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import { UnitContext } from "../components/unitContext"; // Ensure the correct import

const API_KEY = "f5cdf8b40374412e643bcfbb74117105";
const CITY = "Zwolle"; // Default city

const WeatherCard = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const { unit } = useContext(UnitContext); // Get the unit from context

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true); // Ensure loading starts on every unit change
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=${unit}&appid=${API_KEY}`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather(); // Call the function inside useEffect
  }, [unit]); // Re-fetch when unit changes

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.city}>{weather.name}</Text>
      <Image 
        source={{ uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }} 
        style={styles.icon} 
      />
      <Text style={styles.temp}>
        {Math.round(weather.main.temp)} {unit === "metric" ? "°C" : "°F"}
      </Text>
      <Text style={styles.description}>{weather.weather[0].description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: 200,
    backgroundColor: "#00c80c",
    width: "85%",
  },
  city: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  icon: {
    width: 50,
    height: 50,
  },
  temp: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    fontSize: 16,
    color: "#fff",
    textTransform: "capitalize",
  },
});

export default WeatherCard;
