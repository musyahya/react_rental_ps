import React from 'react'
import { Row, Button, Col, Form, Card } from "react-bootstrap";

function Register() {
    return (
      <Row className="mt-5 justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header className="text-center bg-primary text-white">Halaman Register</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Konfirmasi Password</Form.Label>
                  <Form.Control type="password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
}

export default Register
