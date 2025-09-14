
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { City } from "../types/types";
import Clock from "../components/Clock";
import "../App.css";

const CityPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [city, setCity] = useState<City | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load cities from localStorage and find the city by URL id param
    const stored = localStorage.getItem("world_clock_cities");
    if (stored) {
      const cities: City[] = JSON.parse(stored);
      const found = cities.find((c) => c.id === id);
      if (found) setCity(found);
    }
  }, [id]);

  if (!city) {
    // Show a message if city is missing (e.g., direct bad URL)
    return <p style={{ textAlign: "center" }}>Ingen stad hittades.</p>;
  }

  // Map known city names to IANA timezone IDs for the Clock
  const cityTimeZones: { [key: string]: string } = {
    "London": "Europe/London",
    "Paris": "Europe/Paris",
    "New York": "America/New_York",
    "Tokyo": "Asia/Tokyo",
    "Berlin": "Europe/Berlin",
    "Rome": "Europe/Rome",
    "Madrid": "Europe/Madrid",
    "Moscow": "Europe/Moscow",
    "Beijing": "Asia/Shanghai",
    "Seoul": "Asia/Seoul",
    "Bangkok": "Asia/Bangkok",
    "Dubai": "Asia/Dubai",
    "Los Angeles": "America/Los_Angeles",
    "Toronto": "America/Toronto",
    "São Paulo": "America/Sao_Paulo",
    "Buenos Aires": "America/Argentina/Buenos_Aires",
    "Cairo": "Africa/Cairo",
    "Cape Town": "Africa/Johannesburg",
    "Sydney": "Australia/Sydney",
    "Auckland": "Pacific/Auckland",
  };

  const timeZone = cityTimeZones[city.name] || "UTC"; // fallback if not in list

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#bdbbbbff", // consistent background with HomePage
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      {/* Back to home page */}
      <button
        className="back-button"
        onClick={() => navigate("/")}
        style={{ marginBottom: "20px", padding: "10px 15px", cursor: "pointer" }}
      >
        ⬅ Tillbaka
      </button>

      <Clock
        cityName={city.name}
        timeZone={timeZone}
        size={500}           // larger clock for detail view
        showNumbers={true}
        backgroundImage={city.imageUrl}
      />
    </div>
  );
};

export default CityPage;
