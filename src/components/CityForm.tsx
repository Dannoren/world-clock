import React, { useState } from "react";
import { City } from "../types/types";
import london from "../assets/london.jpg";
import newyork from "../assets/newyork.jpg";
import paris from "../assets/paris.jpg";
import tokyo from "../assets/tokyo.jpg";

interface CityOption {
  name: string;
  timeZoneOffset: number;
  image?: string;
}

// Predefined city list with optional images and GMT offsets
const cities: CityOption[] = [
  { name: "London", timeZoneOffset: 0, image: london },
  { name: "New York", timeZoneOffset: -5, image: newyork },
  { name: "Paris", timeZoneOffset: 1, image: paris },
  { name: "Tokyo", timeZoneOffset: 9, image: tokyo },
  { name: "Berlin", timeZoneOffset: 1 },
  { name: "Rome", timeZoneOffset: 1 },
  { name: "Madrid", timeZoneOffset: 1 },
  { name: "Moscow", timeZoneOffset: 3 },
  { name: "Beijing", timeZoneOffset: 8 },
  { name: "Seoul", timeZoneOffset: 9 },
  { name: "Bangkok", timeZoneOffset: 7 },
  { name: "Dubai", timeZoneOffset: 4 },
  { name: "Los Angeles", timeZoneOffset: -8 },
  { name: "Toronto", timeZoneOffset: -5 },
  { name: "São Paulo", timeZoneOffset: -3 },
  { name: "Buenos Aires", timeZoneOffset: -3 },
  { name: "Cairo", timeZoneOffset: 2 },
  { name: "Cape Town", timeZoneOffset: 2 },
  { name: "Sydney", timeZoneOffset: 10 },
  { name: "Auckland", timeZoneOffset: 12 },
];

// Continent options for manual city entry
const continents = ["Europa", "Asien", "Afrika", "Nordamerika", "Sydamerika", "Oceanien"];

interface CityFormProps {
  onAddCity: (city: City) => void; // callback to add a city to the parent state
}

const CityForm: React.FC<CityFormProps> = ({ onAddCity }) => {
  // Local state for form inputs
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("");
  const [selectedGMT, setSelectedGMT] = useState<number>(0);

  // Show all cities if no search term; otherwise filter by search
  const filteredOptions =
    searchTerm.trim() === ""
      ? cities
      : cities.filter((city) =>
          city.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cityName = selectedCity || searchTerm;
    if (!cityName) return; // skip if no city chosen or typed

    // Find matching city in predefined list
    const option = cities.find((c) => c.name.toLowerCase() === cityName.toLowerCase());
    let timeZoneOffset = option ? option.timeZoneOffset : 0;

    // Allow manual GMT offset if city not in list but continent is Europe
    if (!option && selectedContinent === "Europa") {
      timeZoneOffset = selectedGMT;
    }

    // Create new city object for parent component
    const newCity: City = {
      id: Date.now().toString(),
      name: cityName,
      timeZoneOffset,
      imageUrl: option ? option.image : undefined,
    };

    onAddCity(newCity); // send to parent
    // Reset form inputs
    setSearchTerm("");
    setSelectedCity("");
    setSelectedContinent("");
    setSelectedGMT(0);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        marginBottom: "30px",
      }}
    >
      {/* Dropdown with all matching cities */}
      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        style={{ minWidth: "180px", fontSize: "1rem", padding: "6px" }}
      >
        <option value="">Välj stad</option>
        {filteredOptions.map((c) => (
          <option key={c.name} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Free-text search or custom city name */}
      <input
        type="text"
        placeholder="Skriv stad..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "6px", width: "220px", fontSize: "1rem" }}
      />

      {/* Optional continent selector for manual GMT */}
      <select
        value={selectedContinent}
        onChange={(e) => setSelectedContinent(e.target.value)}
        style={{ minWidth: "140px", fontSize: "1rem", padding: "6px" }}
      >
        <option value="">Välj kontinent</option>
        {continents.map((cont) => (
          <option key={cont} value={cont}>
            {cont}
          </option>
        ))}
      </select>

      {/* GMT offset selector appears only when Europe is chosen */}
      {selectedContinent === "Europa" && (
        <select
          value={selectedGMT}
          onChange={(e) => setSelectedGMT(Number(e.target.value))}
          style={{ minWidth: "100px", fontSize: "1rem", padding: "6px" }}
        >
          {Array.from({ length: 25 }, (_, i) => i - 12).map((offset) => (
            <option key={offset} value={offset}>
              GMT{offset >= 0 ? `+${offset}` : offset}
            </option>
          ))}
        </select>
      )}

      <button type="submit" style={{ padding: "6px 12px", fontSize: "1rem" }}>
        Lägg till
      </button>
    </form>
  );
};

export default CityForm;
