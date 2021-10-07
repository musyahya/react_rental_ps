import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import SidebarComponent from '../../components/SidebarComponent';
import { API_URL } from "../../utility/Url";
import { Line } from "react-chartjs-2";

function Dashboard(props) {

  const history = useHistory()
  const [countSelesai, setCountSelesai] = useState()
  const [countBelumSelesai, setCountBelumSelesai] = useState()
  const [chartSewa, setChartSewa] = useState()
  const [date, setDate] = useState()

  useEffect(() => {
      cekRole()
  }, [])

  useEffect(() => {
      getCountSelesai();
  }, [])

  useEffect(() => {
      getCountBelumSelesai();
  }, [])

  useEffect(() => {
      getChartSewa();
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

  function getChartSewa() {
     axios({
       method: "get",
       url: API_URL + "sewa_chart",
       headers: { Authorization: `Bearer ${props.token}` },
     })
       .then(function (response) {
         console.log(response);
         const data = response.data.data
         setChartSewa(Object.values(data));

         let date = []
         for (let index = 0; index < Object.keys(data).length; index++) {
           date.push(index+1)
         }
         setDate(date)
       })
       .catch(function (error) {
         console.log(error.response);
       });
  }

  const data = {
    labels: date,
    datasets: [
      {
        label: "Selesai Sewa",
        data: chartSewa,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

    return (
      <SidebarComponent>
        <h1>Dashboard</h1>

        <Row>
          <Col md="6">
            <Card className="bg-success text-white my-3">
              <Card.Body>
                <Card.Title>Selesai Sewa</Card.Title>
                <Card.Text>
                  <h1 className="float-end">{countSelesai}</h1>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <Card className="bg-primary text-white my-3">
              <Card.Body>
                <Card.Title>Belum Selesai Sewa</Card.Title>
                <Card.Text>
                  <h1 className="float-end">{countBelumSelesai}</h1>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Line data={data} options={options} className="my-3" />
      </SidebarComponent>
    );
}

export default Dashboard
