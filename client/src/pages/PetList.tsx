// This page will let them sort through a list of pets based on search parameters.
// Once they click on the pets then it will take them to the pet details page.

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import { PetList } from "../components/PetFinder";
=======
import PetList from "./components/PetFinder.tsx";
>>>>>>> 2bd297c5b843c8bdfeab9730ca98b7e951410f0d

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
