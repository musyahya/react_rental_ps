import React from 'react'
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function SidebarComponent(props) {

    const { pathname } = useLocation();

    return (
      <Container className="mt-5">
        <Row>
          <Col md={4} lg={3} className="mb-3">
            <ListGroup>
              <ListGroup.Item
                as={Link}
                to="/dashboard"
                className={pathname === "/dashboard" && "active"}
              >
                Dashboard
              </ListGroup.Item>
              <ListGroup.Item
                as={Link}
                to="/rental"
                className={pathname === "/rental" && "active"}
              >
                Rental
              </ListGroup.Item>
              <ListGroup.Item
                as={Link}
                to="/barang"
                className={pathname === "/barang" && "active"}
              >
                Barang
              </ListGroup.Item>
              <ListGroup.Item
                as={Link}
                to="/detail_barang"
                className={pathname === "/detail_barang" && "active"}
              >
                Detail Barang
              </ListGroup.Item>
              <ListGroup.Item
                as={Link}
                to="/sewa"
                className={pathname === "/sewa" && "active"}
              >
                Sewa
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={8} lg={9}>
            {props.children}
          </Col>
        </Row>
      </Container>
    );
}

export default SidebarComponent
