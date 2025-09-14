
import React, { useState, useEffect } from "react";
import CityForm from "../components/CityForm";
import CityCard from "../components/CityCard";
import { City } from "../types/types";
import { loadCities, saveCities } from "../services/localStorageService";
import londonImg from "../assets/london.jpg";
import newyorkImg from "../assets/newyork.jpg";
import parisImg from "../assets/paris.jpg";
import tokyoImg from "../assets/tokyo.jpg";

// Predefined starter cities if no data is in localStorage
const initialCities: City[] = [
  { id: "1", name: "London", timeZoneOffset: 1, imageUrl: londonImg },
  { id: "2", name: "New York", timeZoneOffset: -5, imageUrl: newyorkImg },
  { id: "3", name: "Paris", timeZoneOffset: 1, imageUrl: parisImg },
  { id: "4", name: "Tokyo", timeZoneOffset: 9, imageUrl: tokyoImg },
];

const HomePage: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    // Load from localStorage; if empty, seed with initialCities
    const storedCities = loadCities();
    if (storedCities.length > 0) {
      setCities(storedCities);
    } else {
      setCities(initialCities);
      saveCities(initialCities);
    }
  }, []);

  const handleAddCity = (city: City) => {
    // Remove any existing entry with same name (case-insensitive) before adding
    const newCities = [
      ...cities.filter((c) => c.name.toLowerCase() !== city.name.toLowerCase()),
      city,
    ];
    setCities(newCities);
    saveCities(newCities);
  };

  const handleRemoveCity = (id: string) => {
    // Remove city by its unique id
    const newCities = cities.filter((c) => c.id !== id);
    setCities(newCities);
    saveCities(newCities);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#bdbbbbff", // light background
        margin: 0,
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "3rem",
          marginBottom: "20px",
          color: "#333",
        }}
      >
        World Clock
      </h1>

      {/* Form to add new cities */}
      <CityForm onAddCity={handleAddCity} />

      {/* Display all city cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "20px",
          gap: "12px",
        }}
      >
        {cities.map((city) => (
          <CityCard
            key={city.id}
            city={city}
            onRemove={handleRemoveCity}
            clockSize={234} // slightly larger clocks on home page
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
