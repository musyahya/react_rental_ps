import axios from "axios";
import React, { useState, useEffect } from "react";
import SidebarComponent from '../../components/SidebarComponent';
import TableComponent from "../../components/TableComponent";

function DetailBarang(props) {

    const [detailBarang, setDetailBarang] = useState()

    useEffect(() => {
        getDetailBarang()
    }, [])

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

    return (
      <SidebarComponent>
        <h1>Detail Barang</h1>

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
