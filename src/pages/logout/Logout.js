import axios from 'axios';
import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { API_URL } from "../../utility/Url";

function Logout(props) {

    const history = useHistory();

    useEffect(() => {
        logout()
    })

    function logout() {
       axios({
         method: "post",
         url: API_URL +"logout",
         headers: { "Authorization": `Bearer ${props.token}` },
       })
         .then(function (response) {
           console.log(response);
           props.setToken()
           props.setRole()
           localStorage.removeItem('token')
           localStorage.removeItem('role')
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
