import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import CardComponent from "../../components/CardComponent";

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
    <CardComponent action={login} title="Login">
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </Form.Group>
    </CardComponent>
  );
}

export default Login;
