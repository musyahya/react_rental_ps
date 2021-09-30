import axios from "axios";
import React, { useState } from "react";
import { Row, Button, Col, Form, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function Login(props) {

      const [email, setEmail] = useState();
      const [password, setPassword] = useState();

      const history = useHistory()

      function login() {
           axios
             .post("http://127.0.0.1:8000/api/login", {
               email: email,
               password: password,
             })
             .then(function (response) {
               console.log(response);
               localStorage.setItem("token", response.data.token);
               props.setToken(response.data.token);
               history.push("/dashboard");
             })
             .catch(function (error) {
               console.log(error);
             });
      }
    
  return (
    <Row className="mt-5 justify-content-center">
      <Col md={6}>
        <Card className="shadow border-radius">
          <Card.Header className="text-center bg-primary text-white header-radius">
            Halaman Login
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </Form.Group>

              <Button variant="primary" onClick={login}>
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Login;
