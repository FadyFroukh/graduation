import React from 'react';
import {FaTrash,FaEdit} from 'react-icons/fa';
import axios from 'axios';
import swal from 'sweetalert';
import "../css/User.css";

function User({user}){

    const handleDelete = ()=>{
        axios.delete("http://localhost:4000/users/" + user._id).then(res=>{
        }).catch(err=>{
            console.log("Not correct");
        })
    }

    return(
        <>
            <div className="user">
                <div className="user-name">
                    <p>{user.name}</p>
                </div>
                <div className="user-icons">
                    <FaTrash style={{marginRight:"6px", color:"#EA2027"}} onClick={handleDelete}/>
                    <FaEdit style={{color:"#009432"}}/>
                </div>
            </div>
        </>
    );
}

export default User;