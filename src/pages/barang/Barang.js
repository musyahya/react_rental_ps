import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Table } from 'react-bootstrap';
import SidebarComponent from '../../components/SidebarComponent';

function Barang(props) {

    const [barang, setBarang] = useState()

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

    return (
      <SidebarComponent>
        <h1>Barang</h1>

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
                  <td>{index+1}</td>
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
