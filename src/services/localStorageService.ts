
import { City } from "../types/types";

const STORAGE_KEY = "world_clock_cities";

export const loadCities = (): City[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored); // Safely parse JSON if present
    } catch {
      return []; // Return empty array if parsing fails
    }
  }
  return [];
};

export const saveCities = (cities: City[]) => {
  // Persist current city list to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
};
