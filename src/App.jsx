import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from "./AllRoutes";
import Navigation from "./Component/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Router>
      <Navigation />
      <AllRoutes />
    </Router>
  );
};

export default App;