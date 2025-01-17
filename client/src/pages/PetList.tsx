// This page will let them sort through a list of pets based on search parameters.
// Once they click on the pets then it will take them to the pet details page.

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PetList from "../components/PetFinder";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/pets" element={<PetList />} />
      </Routes>
    </Router>
  );
};

export default App;
