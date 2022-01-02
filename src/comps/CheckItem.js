import React, { useEffect } from 'react';
import {FaTrash} from 'react-icons/fa';
import axios from 'axios';
import swal from 'sweetalert';

function CheckItem({order,total,setTotal}){

    const handleDelete = ()=>{
        axios.delete("http://localhost:4000/orders/" + order._id).then(res=>{
        }).catch(err=>{
            console.log("An error occured");
        })
        setTotal((total)=>total - order.itemPrice);
        swal({title:"Item Deleted Successfully",text:`${order.itemName} Removed from The Check`,icon:"success"})
    }

    useEffect(()=>{
        setTotal((total)=>total+order.itemPrice);
    },[])

    return(
        <div className="check-item">
            <div className="item-name">{order.itemName}</div>
            <div className="item-price">{order.itemPrice}</div>
            <div className="item-delete"><FaTrash onClick={handleDelete}/></div>
        </div>  
    );
}

export default CheckItem;