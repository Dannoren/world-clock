// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CityPage from "./pages/CityPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Home page showing all cities */}
        <Route path="/" element={<HomePage />} />
        {/* Dynamic city detail page by id */}
        <Route path="/city/:id" element={<CityPage />} />
      </Routes>
    </Router>
  );
};

export default App;