import React, { Fragment } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from 'react-router-dom';

function NavbarComponent(props) {



    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            {props.token ? (
              <Fragment>
                <Nav.Link as={Link} to="/dashboard">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/logout">
                  Logout
                </Nav.Link>
              </Fragment>
            ) : (
              <Fragment>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/">
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
