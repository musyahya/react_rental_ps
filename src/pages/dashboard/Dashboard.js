import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import SidebarComponent from '../../components/SidebarComponent';

function Dashboard(props) {

  const history = useHistory()

  useEffect(() => {
      cekRole()
  }, [])

  function cekRole() {
    if(props.role != 1){
      history.push("/");
    }
  }

    return (
      <SidebarComponent>
        <h1>Dashboard</h1>
      </SidebarComponent>
    );
}

export default Dashboard
