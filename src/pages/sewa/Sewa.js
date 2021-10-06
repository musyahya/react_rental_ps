import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import SidebarComponent from "../../components/SidebarComponent";
import TableComponent from "../../components/TableComponent";
import { API_URL } from "../../utility/Url";

function Sewa(props) {
  const history = useHistory();
  const [sewa, setSewa] = useState();

  useEffect(() => {
    cekRole();
  }, []);

  function cekRole() {
    if (props.role != 1) {
      history.push("/");
    }
  }

  useEffect(() => {
    getSewa();
  }, []);

  function getSewa() {
    axios({
      method: "get",
      url: API_URL + "sewa",
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

  function updateSewa(id) {
       axios({
         method: "put",
         url: API_URL + "sewa/" +id,
         headers: { Authorization: `Bearer ${props.token}` },
       })
         .then(function (response) {
           console.log(response);
           getSewa();
         })
         .catch(function (error) {
           console.log(error.response);
         });
  }

  return (
    <SidebarComponent>
      <h1>Sewa</h1>

      <TableComponent>
        <thead>
          <tr>
            <th>No</th>
            <th>User</th>
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
                <td>{sewa.user.name}</td>
                <td>{sewa.detail_barang.barang.nama}</td>
                <td>{sewa.tanggal_diambil}</td>
                <td>{sewa.tanggal_dikembalikan}</td>
                <td>Rp. {sewa.denda}</td>
                <td>Rp. {sewa.total_bayar}</td>
                <td>
                  {(sewa.status == 1) ? (
                    <Button
                      size="sm"
                      onClick={() => updateSewa(sewa.id)}
                      variant="success"
                    >
                      Selesaikan
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="success"
                      disabled
                    >
                      Sukses
                    </Button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </TableComponent>
    </SidebarComponent>
  );
}

export default Sewa;
