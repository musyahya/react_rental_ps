import axios from 'axios';
import React, {useState} from 'react'
import { Form } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import CardComponent from '../../components/CardComponent';
import SmallError from '../../components/SmallError';

function Register(props) {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordConfirmation, setPasswordConfirmation] = useState();

    const history = useHistory()
    const [error, setError] = useState();

    function register() {
        axios
          .post("http://127.0.0.1:8000/api/register", {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
          })
          .then(function (response) {
            console.log(response);
             localStorage.setItem("token", response.data.token);
             props.setToken(response.data.token)
             history.push('/dashboard')
          })
          .catch(function (error) {
            console.log(error.response);
            setError(error.response.data.errors)
          });
    }

    return (
      <CardComponent title="Register" action={register}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control onChange={(e) => setName(e.target.value)} type="text" />
          {error && <SmallError error={error.name[0]} />}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          {error && <SmallError error={error.email[0]} />}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          {error && <SmallError error={error.password[0]} />}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Konfirmasi Password</Form.Label>
          <Form.Control
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            type="password"
          />
        </Form.Group>
      </CardComponent>
    );
}

export default Register
