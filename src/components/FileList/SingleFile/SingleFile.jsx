import React from 'react';
import { NavLink } from "react-router-dom";

const SingleFile = ({ name, description,id }) => {
    return (
        <li className="Single__File">
            <NavLink to={`/file/${id}`} activeClassName="active" className="Nav_Link">
                <p className="m-2 font-weight-bold">{name}</p>
            </NavLink>
        </li>
    )
}

export default SingleFile
