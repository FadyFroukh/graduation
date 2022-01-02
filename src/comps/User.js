import React from 'react';
import {FaTrash,FaEdit} from 'react-icons/fa';
import axios from 'axios';
import "../css/User.css";

function User({user,setShowMenu,showMenu,setId,setOldUser}){

    const handleDelete = ()=>{
        axios.delete("http://localhost:4000/users/" + user._id).then(res=>{
        }).catch(err=>{
            console.log("An error occured");
        })
    }

    const handleEditMenu = ()=>{
        setShowMenu(!showMenu);
        setId(user._id);
        setOldUser(user);
    }

    return(
        <>
            <div className="user">
                <div className="user-name">
                    <p>{user.name}</p>
                </div>
                <div className="user-icons">
                    <FaTrash style={{marginRight:"6px", color:"#EA2027"}} onClick={handleDelete}/>
                    <FaEdit style={{color:"#009432"}} onClick={handleEditMenu}/>
                </div>
            </div>
        </>
    );
}

export default User;