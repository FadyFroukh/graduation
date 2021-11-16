import React from 'react';
import {FaTrash} from 'react-icons/fa';
import axios from 'axios';
import {useCookies} from "react-cookie";

function CheckItem({item}){

    const [cookies,setCookie] = useCookies(["total"]);

    const handleDelete = (e)=>{
        axios.delete("http://localhost:4000/items",{data:{id:item._id}}).then(res=>{
        }).catch(err=>{
            console.log("Not correct");
        })

        setCookie("total",Number(cookies.total) - Number(item.itemPrice),{path:"/menu", sameSite:"strict"});
    }

    return(
        <div className="check-item">
            <div className="item-name">{item.itemName}</div>
            <div className="item-price">{item.itemPrice}</div>
            <div>{item._id}</div>
            <div className="item-delete"><FaTrash onClick={handleDelete}/></div>
        </div>  
    );
}

export default CheckItem;