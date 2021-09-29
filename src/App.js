import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import RouteComponent from "./routes/RouteComponent";

function App() {

  const [token, setToken] = useState()

  useEffect(() => {
    getToken()
  })

  function getToken() {
    setToken(localStorage.getItem('token'))
  }

  return (
    <Router>
      <div>
        <NavbarComponent token={token} />

        <RouteComponent token={token} setToken={setToken} />
      </div>
    </Router>
  );
}

export default App;
