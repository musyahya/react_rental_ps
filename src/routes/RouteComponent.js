import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Login from '../pages/login/Login';
import Logout from "../pages/logout/Logout";
import Register from "../pages/register/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Barang from "../pages/barang/Barang";
import DetailBarang from "../pages/detail_barang/DetailBarang";
import Home from "../pages/home/Home";
import Rental from "../pages/rental/Rental";
import Sewa from "../pages/sewa/Sewa";
import SewaUser from "../pages/sewaUser/SewaUser";

function RouteComponent(props) {

    return (
      <Switch>
        <Route path="/" exact>
          <Home token={props.token} role={props.role} />
        </Route>
        {props.token ? (
          <Fragment>
            <Route path="/dashboard">
              <Dashboard role={props.role} token={props.token} />
            </Route>
            <Route path="/rental">
              <Rental role={props.role} token={props.token} />
            </Route>
            <Route path="/barang">
              <Barang role={props.role} token={props.token} />
            </Route>
            <Route path="/detail_barang">
              <DetailBarang role={props.role} token={props.token} />
            </Route>
            <Route path="/sewa">
              <Sewa role={props.role} token={props.token} />
            </Route>

            <Route path="/sewa_user">
              <SewaUser role={props.role} token={props.token} />
            </Route>

            <Route path="/logout">
              <Logout
                token={props.token}
                setToken={props.setToken}
                setRole={props.setRole}
              />
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
          </Fragment>
        )}
      </Switch>
    );
}

export default RouteComponent
