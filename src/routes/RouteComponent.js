import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Login from '../pages/login/Login';
import Logout from "../pages/logout/Logout";
import Register from "../pages/register/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Barang from "../pages/barang/Barang";
import DetailBarang from "../pages/detail_barang/DetailBarang";
import Home from "../pages/home/Home";

function RouteComponent(props) {

    return (
      <Switch>
        {props.token ? (
          <Fragment>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/barang">
              <Barang token={props.token} />
            </Route>
            <Route path="/detail_barang">
              <DetailBarang token={props.token} />
            </Route>
            <Route path="/logout">
              <Logout token={props.token} setToken={props.setToken} setRole={props.setRole} />
            </Route>
          </Fragment>
        ) : (
          <Fragment>
            <Route path="/login">
              <Login setToken={props.setToken} setRole={props.setRole} />
            </Route>
            <Route path="/register">
              <Register setToken={props.setToken} setRole={props.setRole} />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
          </Fragment>
        )}
      </Switch>
    );
}

export default RouteComponent
