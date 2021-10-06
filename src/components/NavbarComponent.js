import React, { Fragment } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './NavbarComponent.css'

function NavbarComponent(props) {
    return (
      <Navbar bg="dark" variant="dark" id="navbar">
        <Container>
          <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
          <Nav className="mr-auto">
            {props.token ? (
              <Fragment>
                <Nav.Link as={Link} to="/logout">
                  Logout
                </Nav.Link>
              </Fragment>
            ) : (
              <Fragment>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </Fragment>
            )}
          </Nav>
        </Container>
      </Navbar>
    );
}

export default NavbarComponent
