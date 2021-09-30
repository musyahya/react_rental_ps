import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Login from '../pages/login/Login';
import Logout from "../pages/logout/Logout";
import Register from "../pages/register/Register";
import Dashboard from "../pages/dashboard/Dashboard";

function RouteComponent(props) {

    return (
      <Switch>
        {props.token ? (
          <Fragment>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/logout">
              <Logout token={props.token} setToken={props.setToken} />
            </Route>
          </Fragment>
        ) : (
          <Fragment>
            <Route path="/login">
              <Login setToken={props.setToken} />
            </Route>
            <Route path="/" exact>
              <Register setToken={props.setToken} />
            </Route>
          </Fragment>
        )}
      </Switch>
    );
}

export default RouteComponent
