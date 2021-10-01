import axios from "axios";
import React, { useState, useEffect } from "react";
import SidebarComponent from '../../components/SidebarComponent';
import TableComponent from "../../components/TableComponent";
import { Button, Form, Modal } from "react-bootstrap";

function DetailBarang(props) {

    const [detailBarang, setDetailBarang] = useState()
    const [barang, setBarang] = useState()

    const [barangId, setBarangId] = useState()
    const [harga, setHarga] = useState()
    const [durasi, setDurasi] = useState()

     const [tambah, setTambah] = useState();

     const [show, setShow] = useState(false);
     const handleShow = () => setShow(true);

     function handleClose () {
         setShow(false)
         setHarga(" ")
         setDurasi(" ")
         setBarangId(" ")
         setTambah(false)
     }

    useEffect(() => {
        getBarang()
    }, [])

    useEffect(() => {
        getDetailBarang()
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

    function getDetailBarang() {
          axios({
            method: "get",
            url: "http://127.0.0.1:8000/api/detail_barang",
            headers: { Authorization: `Bearer ${props.token}` },
          })
            .then(function (response) {
              console.log(response);
              setDetailBarang(response.data.data);
            })
            .catch(function (error) {
              console.log(error);
            });
    }

    function postDetailBarang() {
        axios({
          method: "post",
          url: "http://127.0.0.1:8000/api/detail_barang",
          headers: { Authorization: `Bearer ${props.token}` },
          data: {
              barang_id: barangId,
              harga: harga,
              durasi: durasi
          }
        })
          .then(function (response) {
            console.log(response);
            handleClose();
            getDetailBarang();
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    function showTambah() {
        handleShow()
        setTambah(true)
    }
    
    return (
      <SidebarComponent>
        <h1>Detail Barang</h1>

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
            <Modal.Title>{tambah && "Tambah"} Detail Barang</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Barang</Form.Label>
                <Form.Select onChange={(e) => setBarangId(e.target.value)}>
                  <option>Pilih Barang</option>
                  {barang &&
                    barang.map((barang) => (
                      <option value={barang.id}>{barang.nama}</option>
                    ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Harga</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  onChange={(e) => setHarga(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Durasi</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  onChange={(e) => setDurasi(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Batal
            </Button>
            {tambah && (
              <Button variant="primary" onClick={postDetailBarang}>
                Simpan
              </Button>
            )}
          </Modal.Footer>
        </Modal>

        <TableComponent>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Harga</th>
              <th>Durasi</th>
            </tr>
          </thead>
          <tbody>
            {detailBarang &&
              detailBarang.map((detailBarang, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{detailBarang.barang.nama}</td>
                  <td>Rp. {detailBarang.harga}</td>
                  <td>{detailBarang.durasi} Hari</td>
                </tr>
              ))}
          </tbody>
        </TableComponent>
      </SidebarComponent>
    );
}

export default DetailBarang
