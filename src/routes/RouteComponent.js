import React from 'react'
import { Switch, Route } from "react-router-dom";
import Login from '../pages/login/Login';
import Logout from "../pages/logout/Logout";
import Register from "../pages/register/Register";

function RouteComponent() {
    return (
      <Switch>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Register />
        </Route>
      </Switch>
    );
}

export default RouteComponent
