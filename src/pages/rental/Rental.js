import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SidebarComponent from '../../components/SidebarComponent'
import TableComponent from "../../components/TableComponent";
import { API_URL } from "../../utility/Url";
import { Button, Form, Modal } from "react-bootstrap";

function Rental(props) {

     const history = useHistory();

     const [rental, setRental] = useState()
     const [nama, setNama] = useState()
     const [email, setEmail] = useState()
     const [hp, setHp] = useState()
     const [alamat, setAlamat] = useState()

      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

     useEffect(() => {
       cekRole();
     }, []);

     function cekRole() {
       if (props.role != 1) {
         history.push("/");
       }
     }

     useEffect(() => {
        getRental()
     }, [])

     function getRental() {
         axios({
           method: "get",
           url: API_URL + "rental",
         })
           .then(function (response) {
             console.log(response);
             setRental(response.data.data);
             setNama(response.data.data.nama)
             setEmail(response.data.data.email)
             setHp(response.data.data.hp)
             setAlamat(response.data.data.alamat);
           })
           .catch(function (error) {
             console.log(error);
           });
     }

     function updateRental() {
         axios({
           method: "put",
           url: API_URL + "rental",
           headers: { Authorization: `Bearer ${props.token}` },
           data: {
               nama: nama,
               email: email,
               hp: hp,
               alamat: alamat
           }
         })
           .then(function (response) {
             console.log(response);
             getRental()
              setNama(" ");
              setEmail(" ");
              setHp(" ");
              setAlamat(" ");
              handleClose()
           })
           .catch(function (error) {
             console.log(error.response);
           });
     }

    return (
      <SidebarComponent>
        <h1>Rental</h1>

        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Edit Rental</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>HP</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Alamat</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Batal
            </Button>
            <Button variant="primary" onClick={updateRental}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>

        <TableComponent>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Email</th>
              <th>Hp</th>
              <th>Alamat</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rental && (
              <tr>
                <td>{rental.nama}</td>
                <td>{rental.email}</td>
                <td>{rental.hp}</td>
                <td>{rental.alamat}</td>
                <td>
                  <Button
                    size="sm"
                    onClick={handleShow}
                    className="mx-2"
                    variant="primary"
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            )}
          </tbody>
        </TableComponent>
      </SidebarComponent>
    );
}

export default Rental
