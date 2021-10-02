import React from 'react'

function SmallError(props) {
    return <small className="text-danger">{props.error}</small>;
}

export default SmallError
