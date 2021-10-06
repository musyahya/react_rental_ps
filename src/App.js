import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import RouteComponent from "./routes/RouteComponent";

function App() {

  const [token, setToken] = useState()
  const [role, setRole] = useState()

  useEffect(() => {
    getRole();
  });

  useEffect(() => {
    getToken()
  })

  function getToken() {
    setToken(localStorage.getItem('token'))
  }

  function getRole() {
    setRole(localStorage.getItem('role'))
  }

  return (
    <Router>
      <div>
        <NavbarComponent token={token} role={role} />

        <RouteComponent token={token} setToken={setToken} role={role} setRole={setRole} />
      </div>
    </Router>
  );
}

export default App;
