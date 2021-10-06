import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Badge } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import TableComponent from "../../components/TableComponent";
import { API_URL } from "../../utility/Url";

function SewaUser(props) {

    const history = useHistory();

    useEffect(() => {
      cekRole();
    }, []);

    function cekRole() {
      if (props.role != 2) {
        history.push("/");
      }
    }

    const [sewa, setSewa] = useState();

     useEffect(() => {
       getSewa();
     }, []);

    function getSewa() {
         axios({
           method: "get",
           url: API_URL + "sewa_user",
           headers: { Authorization: `Bearer ${props.token}` },
         })
           .then(function (response) {
             console.log(response);
             setSewa(response.data.data);
           })
           .catch(function (error) {
             console.log(error);
           });
    }

    console.log(sewa)

    return (
      <Container>
        <h1>Sewa</h1>
        <TableComponent>
          <thead>
            <tr>
              <th>No</th>
              <th>Barang</th>
              <th>Diambil</th>
              <th>Dikembalikan</th>
              <th>Denda</th>
              <th>Total Bayar</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {sewa &&
              sewa.map((sewa, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{sewa.detail_barang.barang.nama}</td>
                  <td>{sewa.tanggal_diambil}</td>
                  <td>{sewa.tanggal_dikembalikan}</td>
                  <td>Rp. {sewa.denda}</td>
                  <td>Rp. {sewa.total_bayar}</td>
                  <td>
                    {sewa.status == 1 ? (
                      <Badge bg="primary">Sedang Disewa</Badge>
                    ) : (
                      <Badge bg="success">Selesai</Badge>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </TableComponent>
      </Container>
    );
}

export default SewaUser
