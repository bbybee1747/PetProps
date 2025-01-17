import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";
import TestApi from "./TestApi.tsx";

function App() {
  return (
    <div className="d-flex flex-column vh-100 vw-100">
      <Header />
      <main className="flex-grow-1">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Outlet />
              <TestApi />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
