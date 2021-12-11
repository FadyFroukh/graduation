import React, { useEffect } from 'react';
import "../css/Order.css";
import {FaTrash} from 'react-icons/fa';
import axios from 'axios';
function Order({order}){

    const handleDelete = ()=>{
        axios.delete("http://localhost:4000/orders/" + order._id).then(res=>{
        }).catch(err=>{
            console.log("Not correct");
        })
    }


    useEffect(()=>{

    },[order])

    return(
        <>
            <div className="order">
                <div className="order-name">
                    <p>{order.itemName}</p>
                </div>
                <div className="order-price">
                    <p>{order.itemPrice}</p>
                </div>
                <div className="order-ops">
                    <FaTrash style={{color:"#EA2027"}} onClick={handleDelete}/>
                </div>
            </div>
        </>
    );
}

export default Order;