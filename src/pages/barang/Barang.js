import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, ButtonGroup } from "react-bootstrap";
import SidebarComponent from '../../components/SidebarComponent';

function Barang(props) {

    const [barang, setBarang] = useState()
    const [nama, setNama] = useState()
    const [deskripsi, setDeskripsi] = useState()
    const [id, setId] = useState()

    const [tambah, setTambah] = useState(false)
    const [edit, setEdit] = useState(false)
    const [hapus, setHapus] = useState(false)

    const [show, setShow] = useState(false);

    function handleShow () {
        setShow(true);
    }

    function handleClose () {
        setShow(false);
        setEdit(false)
        setTambah(false)
        setHapus(false)
        setNama(" ");
        setDeskripsi(" ");
        setId(" ");
    }

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
             getBarang()
           })
           .catch(function (error) {
             console.log(error);
           });
     }

     function getBarangId(id) {
       axios({
         method: "get",
         url: "http://127.0.0.1:8000/api/barang/" +id,
         headers: { Authorization: `Bearer ${props.token}` },
       })
         .then(function (response) {
           console.log(response);
           handleShow()
           setNama(response.data.data.nama)
           setDeskripsi(response.data.data.deskripsi)
           setId(response.data.data.id)
           setEdit(true)
         })
         .catch(function (error) {
           console.log(error);
         });
     }

     function updateBarang() {
          axios({
            method: "put",
            url: "http://127.0.0.1:8000/api/barang/" + id,
            headers: { Authorization: `Bearer ${props.token}` },
            data: {
                nama: nama,
                deskripsi: deskripsi
            }
          })
            .then(function (response) {
              console.log(response);
               handleClose();
               getBarang();
            })
            .catch(function (error) {
              console.log(error);
            });
     }

     function deleteBarang() {
          axios({
            method: "delete",
            url: "http://127.0.0.1:8000/api/barang/" + id,
            headers: { Authorization: `Bearer ${props.token}` },
          })
            .then(function (response) {
              console.log(response);
              handleClose();
              getBarang();
            })
            .catch(function (error) {
              console.log(error);
            });
     }

     function showTambah() {
          handleShow();
          setTambah(true);
     }

     function showDelete(id) {
         handleShow();
         setId(id)
         setHapus(true)
     }

    return (
      <SidebarComponent>
        <h1>Barang</h1>

        <Button
          variant="primary"
          size="sm"
          className="mt-3"
          onClick={showTambah}
        >
          Tambah
        </Button>

        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {edit && "Edit"} {tambah && "Tambah"} {hapus && "Hapus"} Barang
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
                hapus ? (
                    <p>Anda yakin ingin menghapus data ?</p>
                ) : (
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control
                            onChange={(e) => setNama(e.target.value)}
                            type="text"
                            value={nama}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Deskripsi</Form.Label>
                            <Form.Control
                            as="textarea"
                            rows={3}
                            onChange={(e) => setDeskripsi(e.target.value)}
                            value={deskripsi}
                            />
                        </Form.Group>
                    </Form>
                )
            }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Batal
            </Button>
            {edit && (
              <Button
                variant="primary"
                onClick={updateBarang}
              >
                Update
              </Button>
            )}
            {tambah && (
              <Button
                variant="primary"
                onClick={postBarang}
              >
                Simpan
              </Button>
            )}
            {hapus && (
              <Button
                variant="primary"
                onClick={deleteBarang}
              >
                Hapus
              </Button>
            )}
          </Modal.Footer>
        </Modal>

        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Deskripsi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {barang &&
              barang.map((barang, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{barang.nama}</td>
                  <td>{barang.deskripsi}</td>
                  <td>
                    <ButtonGroup aria-label="Basic example">
                      <Button
                        size="sm"
                        onClick={() => getBarangId(barang.id)}
                        className="mx-2"
                        variant="primary"
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => showDelete(barang.id)}
                        variant="danger"
                      >
                        Hapus
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </SidebarComponent>
    );
}

export default Barang
