import React, { useEffect, useState } from 'react';
import "../css/Order.css";
import {FaSortDown,FaSortUp, FaTrash} from 'react-icons/fa';
import axios from 'axios';
function Order({order,total,setTotal}){

    const [show,setShow] = useState(false);

    const handleDelete = ()=>{
        axios.delete("http://localhost:4000/orders/" + order._id).then(res=>{

        }).catch(err=>{
            console.log("An error occured");
        })

        setTotal((total)=>total - order.itemPrice);
    }

    const showIngds = ()=>{
        setShow(!show);
    }

    useEffect(()=>{
        setTotal((total)=>total+order.itemPrice);
    },[])

    return(
        <div className='ord'>
            <div className="order">
                <div className='order-body'>
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
                <div>
                    {
                        show ? <FaSortUp onClick={showIngds}/> : <FaSortDown onClick={showIngds}/>
                    }
                </div>
            </div>
            {
                show ? <div className='order-ingds'>
                    {
                        order.ingds.length > 0 ? order.ingds.map((ingd,i)=>
                            <p key={i}>{ingd}</p>    
                        ) : <p>No added ingredients</p>
                    }
                    </div> : null
            }
        </div>
    );
}

export default Order;