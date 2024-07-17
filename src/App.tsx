import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import "./index.css";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import Episode from "./components/Episode";
import Location from "./components/LocationDetail";
import SearchCharacters from "./components/SearchComponent";
import Navbar from "./components/NavBar";
function App() {
  return (
    <Router>
      <div className="text-white font-[300] text-montserrat px-10 bg-[rgb(29,31,47)]">
        <Navbar />
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
          <Route path="/episode/:id" element={<Episode />} />
          <Route path="/location/:id" element={<Location />} />
          <Route path="/search" element={<SearchCharacters />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
