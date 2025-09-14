import React from "react";
import { City } from "../types/types";
import { useNavigate } from "react-router-dom";
import Clock from "./Clock";

export interface CityCardProps {
  city: City;
  onRemove: (id: string) => void;
  clockSize?: number; // Optional size for the clock
}

const CityCard: React.FC<CityCardProps> = ({ city, onRemove, clockSize }) => {
  const navigate = useNavigate();

  // Map city names to IANA timezone strings for Clock component
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

  const timeZone = cityTimeZones[city.name] || "UTC"; // fallback UTC if city not mapped

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "12px",
        cursor: "pointer",
      }}
    >
      {/* Clicking the clock navigates to the city detail page */}
      <div onClick={() => navigate(`/city/${city.id}`)}>
        <Clock
          cityName={city.name}
          timeZone={timeZone}
          size={clockSize ?? 187} // default size if not provided
          showNumbers={true}
          backgroundImage={city.imageUrl}
        />
      </div>
      <button
        onClick={() => onRemove(city.id)}
        style={{
          marginTop: "8px",
          padding: "4px 8px",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Ta bort
      </button>
    </div>
  );
};

export default CityCard;