import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { API_URL, STORAGE_URL } from "../../utility/Url";
import './Hero.css'

function Home() {

    const [rental, setRental] = useState()
    const [detailBarang, setDetailBarang] = useState()

    useEffect(() => {
        getRental()
    }, [])

    useEffect(() => {
        getDetailBarang();
    }, [])

    function getRental() {
      axios({
        method: "get",
        url: API_URL + "rental",
      })
        .then(function (response) {
          console.log(response);
          setRental(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    function getDetailBarang() {
      axios({
        method: "get",
        url: API_URL + "detail_barang",
      })
        .then(function (response) {
          console.log(response);
          setDetailBarang(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    console.log(detailBarang);

    return (
      <div>
        <div id="hero" className="text-center">
          <Container>
            <Row className="align-items-center hero-row">
              <Col lg="6">
                <h1 className="display-1">{rental && rental.nama}</h1>
                <p className="hero-p mt-4">Malayani Rental PS</p>
              </Col>
              <Col lg="6">
                <img src="/img/game.svg" className="img-fluid" />
              </Col>
            </Row>
          </Container>
        </div>

        <div id="produk">
          <Container>
            <h1 className="text-center mb-5">Produk</h1>
            <Row>
              {detailBarang &&
                detailBarang.map((detailBarang) => (
                  <Col md="3" xs={6}>
                    <Card className="shadow mb-5">
                      <Card.Img
                        variant="top"
                        src={STORAGE_URL + detailBarang.barang.gambar}
                        height="150"
                      />
                      <Card.Body>
                        <Card.Title>{detailBarang.barang.nama}</Card.Title>
                        <Card.Text>
                          <span>Durasi : {detailBarang.durasi} Hari</span>
                          <br />
                          <span>Rp. {detailBarang.harga}</span>
                        </Card.Text>
                        <Button variant="primary" className="float-end">
                          Sewa
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          </Container>
        </div>

        <div id="lokasi">
          <Container>
            <h1 className="text-center mb-5">Lokasi</h1>
            <Row>
              <Col md="12" className="mb-5">
                <iframe
                  width="100%"
                  height="500"
                  frameborder="0"
                  scrolling="no"
                  marginheight="0"
                  marginwidth="0"
                  id="gmap_canvas"
                  src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=pahlawan%20semarang+(laravel%20rental%20ps)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                ></iframe>{" "}
                <a href="http://www.mapshomepage.org/">iframe google maps</a>{" "}
                <script
                  type="text/javascript"
                  src="https://embedmaps.com/google-maps-authorization/script.js?id=0a0431f6cc8a83264b2c77429bc41e5bce7c2e4a"
                ></script>
              </Col>
            </Row>
          </Container>
        </div>

        <div id="kontak" className="text-center">
          <h1 className="mb-5">Kontak</h1>
          <Container>
            <Row>
              <Col md="4">
                <Card className="shadow-sm mb-5">
                  <Card.Body>
                    <Card.Title>HP</Card.Title>
                    <Card.Text>
                      <p>{rental && rental.hp}</p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md="4">
                <Card className="shadow-sm mb-5">
                  <Card.Body>
                    <Card.Title>Alamat</Card.Title>
                    <Card.Text>
                      <p>{rental && rental.alamat}</p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md="4">
                <Card className="shadow-sm mb-5">
                  <Card.Body>
                    <Card.Title>Email</Card.Title>
                    <Card.Text>
                      <p>{rental && rental.email}</p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>

        <div id="footer">
          <p className="text-center">Copyright 2021 Musyahya</p>
        </div>
      </div>
    );
}

export default Home
