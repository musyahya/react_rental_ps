import axios from 'axios';
import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';

function Logout(props) {

    const history = useHistory();

    useEffect(() => {
        logout()
    })

    function logout() {
       axios({
         method: "post",
         url: "http://127.0.0.1:8000/api/logout",
         headers: { "Authorization": `Bearer ${props.token}` },
       })
         .then(function (response) {
           console.log(response);
           props.setToken()
           localStorage.removeItem('token')
            history.push('/login')
         })
         .catch(function (error) {
           console.log(error);
         });
    }

    return (
        <div>
           
        </div>
    )
}

export default Logout
