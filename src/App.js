import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import RouteComponent from "./routes/RouteComponent";

function App() {
  return (
    <Router>
      <div>
        <NavbarComponent />

        <RouteComponent />
      </div>
    </Router>
  );
}

export default App;
