import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SidebarComponent from '../../components/SidebarComponent'
import TableComponent from "../../components/TableComponent";
import { API_URL } from "../../utility/Url";
import { Button } from "react-bootstrap";

function Rental(props) {

     const history = useHistory();

     const [rental, setRental] = useState()

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
           })
           .catch(function (error) {
             console.log(error);
           });
     }

    return (
      <SidebarComponent>
        <h1>Rental</h1>

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
                    //   onClick={() => getBarangId(barang.id)}
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
