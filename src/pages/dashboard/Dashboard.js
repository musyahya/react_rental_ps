import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import SidebarComponent from '../../components/SidebarComponent';
import { API_URL } from "../../utility/Url";

function Dashboard(props) {

  const history = useHistory()
  const [countSelesai, setCountSelesai] = useState()
  const [countBelumSelesai, setCountBelumSelesai] = useState()

  useEffect(() => {
      cekRole()
  }, [])

  useEffect(() => {
      getCountSelesai();
  }, [])

  useEffect(() => {
      getCountBelumSelesai();
  }, [])

  function cekRole() {
    if(props.role != 1){
      history.push("/");
    }
  }

  function getCountSelesai() {
     axios({
       method: "get",
       url: API_URL + "selesai_sewa",
       headers: { Authorization: `Bearer ${props.token}` },
     })
       .then(function (response) {
         console.log(response);
         setCountSelesai(response.data.data);
       })
       .catch(function (error) {
         console.log(error.response);
       });
  }

  function getCountBelumSelesai() {
     axios({
       method: "get",
       url: API_URL + "belum_selesai_sewa",
       headers: { Authorization: `Bearer ${props.token}` },
     })
       .then(function (response) {
         console.log(response);
         setCountBelumSelesai(response.data.data);
       })
       .catch(function (error) {
         console.log(error.response);
       });
  }

    return (
      <SidebarComponent>
        <h1>Dashboard</h1>

        <Row className="mt-4">
          <Col md="6">
            <Card className="bg-success text-white">
              <Card.Body>
                <Card.Title>Selesai Sewa</Card.Title>
                <Card.Text>
                  <h1 className="float-end">{countSelesai}</h1>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <Card className="bg-primary text-white">
              <Card.Body>
                <Card.Title>Belum Selesai Sewa</Card.Title>
                <Card.Text>
                  <h1 className="float-end">{countBelumSelesai}</h1>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </SidebarComponent>
    );
}

export default Dashboard
