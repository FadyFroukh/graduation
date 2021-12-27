import axios from 'axios';
import React, { useEffect, useState } from 'react';

function AdminTable({user}){

    const [orders,setOrders] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:4000/orders/" + user._id).then(res=>{
            setOrders(res.data);
            console.log(res.data);
        }).catch(()=>{
            console.log("An error occured");
        })
    },[])

    return(
        <>
            <div className="orders-body">
                <header className="orders-header text-center">{user.name}</header>
                <div className="orders">
                   {
                       orders.map(order=>
                            <p>{order.itemName}</p>
                        )
                   }
                </div>
            </div>
        </>
    );
}

export default AdminTable;