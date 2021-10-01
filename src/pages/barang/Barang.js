import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import SidebarComponent from '../../components/SidebarComponent';

function Barang(props) {

    const [barang, setBarang] = useState()
    const [nama, setNama] = useState()
    const [deskripsi, setDeskripsi] = useState()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getBarang()
    }, [])

     function getBarang() {
       axios({
         method: "get",
         url: "http://127.0.0.1:8000/api/barang",
         headers: { Authorization: `Bearer ${props.token}` },
       })
         .then(function (response) {
           console.log(response);
           setBarang(response.data.data);
         })
         .catch(function (error) {
           console.log(error);
         });
     }

     function postBarang() {
         axios({
           method: "post",
           url: "http://127.0.0.1:8000/api/barang",
           headers: { Authorization: `Bearer ${props.token}` },
           data: {
               nama: nama,
               deskripsi: deskripsi
           },
         })
           .then(function (response) {
             console.log(response);
             handleClose();
             setNama(" ");
             setDeskripsi(" ")
             getBarang()
           })
           .catch(function (error) {
             console.log(error);
           });
     }

    return (
      <SidebarComponent>
        <h1>Barang</h1>

        <Button
          variant="primary"
          size="sm"
          className="mt-3"
          onClick={handleShow}
        >
          Tambah
        </Button>

        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Tambah Brang</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  onChange={(e) => setNama(e.target.value)}
                  type="text"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Deskripsi</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={(e) => setDeskripsi(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Batal
            </Button>
            <Button variant="primary" onClick={postBarang}>
              Simpan
            </Button>
          </Modal.Footer>
        </Modal>

        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Deskripsi</th>
            </tr>
          </thead>
          <tbody>
            {barang &&
              barang.map((barang, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{barang.nama}</td>
                  <td>{barang.deskripsi}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </SidebarComponent>
    );
}

export default Barang
