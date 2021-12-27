import React from 'react';
import {FaTrash,FaEdit} from 'react-icons/fa';
import "../css/Meal.css";
import axios from 'axios';
import swal from 'sweetalert';

function Meal({meal,showMenu,setShowMenu,setId}){

    const handleDelete = ()=>{
        axios.delete("http://localhost:4000/meals/" + meal._id).then(res=>{
            swal({icon:"success"})
        }).catch(err=>{
            console.log("Not correct");
        })
    }

    const handleEditMenu = ()=>{
        setShowMenu(!showMenu);
        setId(meal._id);
    }
    
    return (
        <>
            <div className="meal">
                <div className="meal-name">
                    <p>{meal.itemName}</p>
                </div>
                <div className="meal-icons">
                    <FaTrash style={{marginRight:"6px", color:"#EA2027"}} onClick={handleDelete}/>
                    <FaEdit style={{color:"#009432"}} onClick={handleEditMenu}/>
                </div>
            </div>
        </>
    );
}

export default Meal;