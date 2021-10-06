import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';

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

    return (
        <div>
            sewa user
        </div>
    )
}

export default SewaUser
