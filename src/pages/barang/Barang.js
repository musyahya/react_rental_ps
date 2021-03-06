import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, Form, ButtonGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import SidebarComponent from "../../components/SidebarComponent";
import SmallError from "../../components/SmallError";
import TableComponent from "../../components/TableComponent";
import { API_URL, STORAGE_URL } from "../../utility/Url";

function Barang(props) {
  const history = useHistory();

  useEffect(() => {
    cekRole();
  }, []);

  function cekRole() {
    if (props.role != 1) {
      history.push("/");
    }
  }

  const [barang, setBarang] = useState();
  const [nama, setNama] = useState();
  const [deskripsi, setDeskripsi] = useState();
  const [id, setId] = useState();
  const [gambar, setGambar] = useState();
  const [gambarLama, setGambarLama] = useState()

  const [tambah, setTambah] = useState(false);
  const [edit, setEdit] = useState(false);
  const [hapus, setHapus] = useState(false);
  const [error, setError] = useState();

  const [show, setShow] = useState(false);

  function handleShow() {
    setShow(true);
  }

  function handleClose() {
    setShow(false);

    setEdit(false);
    setTambah(false);
    setHapus(false);
    setError(false);

    setNama(" ");
    setDeskripsi(" ");
    setId(" ");
    setGambar(" ");
    setGambarLama(" ")
  }

  useEffect(() => {
    getBarang();
  }, []);

  function getBarang() {
    axios({
      method: "get",
      url: API_URL +'barang',
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
    let formData = new FormData();
    formData.append("nama", nama);
    formData.append("gambar", gambar);
    formData.append("deskripsi", deskripsi);

    axios({
      method: "post",
      url: API_URL +"barang",
      headers: { Authorization: `Bearer ${props.token}` },
      data: formData,
    })
      .then(function (response) {
        console.log(response);
        handleClose();
        getBarang();
      })
      .catch(function (error) {
        console.log(error.response);
        setError(error.response.data.errors);
      });
  }

  function getBarangId(id) {
    axios({
      method: "get",
      url: API_URL +"barang/" + id,
      headers: { Authorization: `Bearer ${props.token}` },
    })
      .then(function (response) {
        console.log(response);
        handleShow();
        setNama(response.data.data.nama);
        setDeskripsi(response.data.data.deskripsi);
        setId(response.data.data.id);
        setGambarLama(response.data.data.gambar)
        setEdit(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

   function updateBarang() {
       let formData = new FormData();
       formData.append("nama", nama);
       formData.append("gambar", gambar);
       formData.append("deskripsi", deskripsi);

        axios({
          method: "post",
          url: API_URL +"barang/" + id +"?_method=PUT",
          headers: { Authorization: `Bearer ${props.token}` },
          data: formData
        })
          .then(function (response) {
            console.log(response);
             handleClose();
             getBarang();
          })
          .catch(function (error) {
            console.log(error.response);
             setError(error.response.data.errors);
          });
   }

  function deleteBarang() {
    axios({
      method: "delete",
      url: API_URL +"barang/" + id,
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
    setId(id);
    setHapus(true);
  }

  return (
    <SidebarComponent>
      <h1>Barang</h1>

      <Button variant="primary" size="sm" className="mt-3" onClick={showTambah}>
        Tambah
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {edit && "Edit"} {tambah && "Tambah"} {hapus && "Hapus"} Barang
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {hapus ? (
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
                {error && <SmallError error={error.nama && error.nama[0]} />}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Gambar</Form.Label>
                {edit && (
                  <Fragment>
                    <br />
                    <img
                      src={STORAGE_URL + gambarLama}
                      width="80"
                      height="80"
                      className="mb-2"
                    />
                  </Fragment>
                )}
                <Form.Control
                  type="file"
                  onChange={(e) => setGambar(e.target.files[0])}
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
                {error && (
                  <SmallError error={error.deskripsi && error.deskripsi[0]} />
                )}
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Batal
          </Button>
          {edit && (
            <Button variant="primary" onClick={updateBarang}>
              Update
            </Button>
          )}
          {tambah && (
            <Button variant="primary" onClick={postBarang}>
              Simpan
            </Button>
          )}
          {hapus && (
            <Button variant="primary" onClick={deleteBarang}>
              Hapus
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <TableComponent>
        <thead>
          <tr>
            <th>No</th>
            <th>Gambar</th>
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
                <td>
                  <img src={STORAGE_URL +barang.gambar} width="80" height="80" />
                </td>
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
      </TableComponent>
    </SidebarComponent>
  );
}

export default Barang;
