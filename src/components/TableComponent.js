import React from 'react'
import { Table } from 'react-bootstrap';

function TableComponent(props) {
    return (
      <Table striped bordered hover className="mt-3">
        {props.children}
      </Table>
    );
}

export default TableComponent
