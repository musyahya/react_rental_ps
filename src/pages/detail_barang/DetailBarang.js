import axios from "axios";
import React, { useState, useEffect } from "react";
import SidebarComponent from '../../components/SidebarComponent';
import TableComponent from "../../components/TableComponent";
import { Button, ButtonGroup, Form, Modal } from "react-bootstrap";
import SmallError from "../../components/SmallError";
import { API_URL } from "../../utility/Url";

function DetailBarang(props) {

    const [detailBarang, setDetailBarang] = useState()
    const [barang, setBarang] = useState()

    const [barangId, setBarangId] = useState()
    const [harga, setHarga] = useState()
    const [durasi, setDurasi] = useState()
    const [id, setId] = useState()
    const [barangNama, setBarangNama] = useState()

    const [error, setError] = useState()
     const [tambah, setTambah] = useState();
     const [edit, setEdit] = useState();
     const [hapus, setHapus] = useState();

     const [show, setShow] = useState(false);
     const handleShow = () => setShow(true);

     function handleClose () {
         setShow(false)

         setHarga(" ")
         setDurasi(" ")
         setBarangId(" ")
         setId(" ")
         setBarangId(" ")
         setBarangNama(" ")

         setTambah(false)
         setEdit(false)
         setHapus(false)
         setError(false)
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
         url: API_URL +"barang",
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
            url: API_URL +"detail_barang",
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
          url: API_URL +"detail_barang",
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
            console.log(error.response);
            setError(error.response.data.errors)
          });
    }

    function showTambah() {
        handleShow()
        setTambah(true)
    }

    function showEdit(id) {
        axios({
          method: "get",
          url: API_URL +"detail_barang/" +id,
          headers: { Authorization: `Bearer ${props.token}` },
        })
          .then(function (response) {
            console.log(response);
            handleShow();
            setEdit(true);
            setHarga(response.data.data.harga)
            setDurasi(response.data.data.durasi)
            setBarangId(response.data.data.barang_id)
            setBarangNama(response.data.data.barang.nama)
            setId(response.data.data.id)
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    function putDetailBarang() {
         axios({
           method: "put",
           url: API_URL +"detail_barang/" + id,
           headers: { Authorization: `Bearer ${props.token}` },
           data: {
               barang_id: barangId,
               harga: harga,
               durasi: durasi
           }
         })
           .then(function (response) {
             console.log(response);
           handleClose()
              getDetailBarang();
           })
           .catch(function (error) {
             console.log(error.response);
              setError(error.response.data.errors);
           });
    }

    function showHapus(id) {
      handleShow();
      setHapus(true);
      setId(id)
    }

    function deleteDetailBarang() {
       axios({
         method: "delete",
         url: API_URL +"detail_barang/" + id,
         headers: { Authorization: `Bearer ${props.token}` },
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

    console.log(barangId)
    
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
            <Modal.Title>
              {tambah && "Tambah"} {edit && "Edit"} {hapus && "Hapus"} Detail
              Barang
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {hapus ? (
              <p>Anda yakin ingin menghapus data ?</p>
            ) : (
              <Form>
                {edit ? (
                  <Form.Group className="mb-3">
                    <Form.Label>Barang</Form.Label>
                    <Form.Select onChange={(e) => setBarangId(e.target.value)}>
                      <option value={barangId}>{barangNama}</option>
                      {barang &&
                        barang.map((barang) => {
                          if (barang.nama !== barangNama) {
                            return (
                              <option value={barang.id}>{barang.nama}</option>
                            );
                          }
                        })}
                    </Form.Select>
                    {error && (
                      <SmallError
                        error={error.barang_id && error.barang_id[0]}
                      />
                    )}
                  </Form.Group>
                ) : (
                  <Form.Group className="mb-3">
                    <Form.Label>Barang</Form.Label>
                    <Form.Select onChange={(e) => setBarangId(e.target.value)}>
                      <option>Pilih Barang</option>
                      {barang &&
                        barang.map((barang) => (
                          <option value={barang.id}>{barang.nama}</option>
                        ))}
                    </Form.Select>
                    {error && (
                      <SmallError
                        error={error.barang_id && error.barang_id[0]}
                      />
                    )}
                  </Form.Group>
                )}

                <Form.Group className="mb-3">
                  <Form.Label>Harga</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    onChange={(e) => setHarga(e.target.value)}
                    value={harga}
                  />
                  {error && (
                    <SmallError error={error.harga && error.harga[0]} />
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Durasi</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    onChange={(e) => setDurasi(e.target.value)}
                    value={durasi}
                  />
                  {error && (
                    <SmallError error={error.durasi && error.durasi[0]} />
                  )}
                </Form.Group>
              </Form>
            )}
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
            {edit && (
              <Button variant="primary" onClick={putDetailBarang}>
                Update
              </Button>
            )}
            {hapus && (
              <Button variant="primary" onClick={deleteDetailBarang}>
                Hapus
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
              <th>Aksi</th>
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
                  <td>
                    <ButtonGroup>
                      <Button
                        onClick={() => showEdit(detailBarang.id)}
                        size="sm"
                        variant="primary"
                        className="mx-2"
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => showHapus(detailBarang.id)}
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

export default DetailBarang
