import React, { useEffect, useState, useCallback, useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { useFocusEffect } from "@react-navigation/native";
import { UnitContext } from "../components/unitContext";
import WeatherCard from "./WeatherCard";

const API_KEY = "f5cdf8b40374412e643bcfbb74117105";

const HomeScreen = () => {
  const { unit } = useContext(UnitContext);
  const [weather, setWeather] = useState(null);
  const [defaultLocation, setDefaultLocation] = useState({ latitude: null, longitude: null });

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const savedLat = await AsyncStorage.getItem("latitude");
        const savedLon = await AsyncStorage.getItem("longitude");

        if (savedLat && savedLon) {
          setDefaultLocation({ latitude: savedLat, longitude: savedLon });
        }
      })();
    }, [])
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      let location = await Location.getCurrentPositionAsync({});
      fetchWeather(location.coords.latitude, location.coords.longitude);
    })();
  }, [unit]);

  useEffect(() => {
    if (defaultLocation.latitude && defaultLocation.longitude) {
      fetchWeather(defaultLocation.latitude, defaultLocation.longitude);
    }
  }, [defaultLocation, unit]);

  const fetchWeather = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        console.error("Error fetching weather:", data.message);
        return;
      }

      setWeather(data);
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  if (!weather) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <WeatherCard />

      <View style={styles.div2}>

          <Text>{weather.name}, {weather.sys.country}</Text>
        
          <View style={styles.div201}>
            <Image
              source={require('../../assets/compass.png')} // Zorg dat je een kompasafbeelding in je project hebt
              style={[styles.compass, { transform: [{ rotate: `${weather.wind.deg}deg` }], width: 30, height: 30 }]}
            />
            <Text style={{ fontWeight: "bold", marginTop: "10" }}>{weather.wind.deg}°</Text>
          </View>

          <View style={styles.div202}>
            <Text style={{color: "white", fontWeight:"bold"}}>Windkracht</Text>
            <Text style={{color: "white", fontWeight:"bold"}}>{weather.wind.speed} m/s</Text>
          </View>

          <View style={styles.div203}>
            <Text style={{color: "white", fontWeight:"bold"}}>Luchtdruk</Text>
            <Text style={{color: "white", fontWeight:"bold"}}>{weather.main.pressure} hPa</Text>
          </View>
          
        </View>

      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },

  div1: {
    marginTop: 50,
    backgroundColor: "#00c80c",
    padding: 10,
    borderRadius: 10,
    width: "90%",
    position: "relative",
    display: "flex",
    alignItems: "center",
  },

  div2: {
    marginTop: 50,
    width: "90%",
    height: "40%",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    justifyContent: "space-between",
    

  },

  div201: {
    width: "48%", // Each box takes about half of the screen width
    height: "48%",
    padding: 20,
    display: "grid",
    justifyItems: "center",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 10, // Adds spacing between rows

    shadowColor: "#505050",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },

  div202: {
    width: "48%", // Each box takes about half of the screen width
    height: "48%",
    padding: 20,
    backgroundColor: "#ff8000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 10, // Adds spacing between rows
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },

  div203: {
    width: "48%", // Each box takes about half of the screen width
    height: "48%",
    padding: 20,
    backgroundColor: "#00c80c",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 10, // Adds spacing between rows
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
});

export default HomeScreen;
