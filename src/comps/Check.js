import React , {useState,useEffect} from 'react';
import "../css/Check.css";
import Container from '../comps/Container';
import {FaTimes} from 'react-icons/fa';
import {IconContext} from 'react-icons/lib';
import CheckItem from './CheckItem';
import axios from 'axios';
import { handleStatus } from './pages/Utils';

function Check({overlayClick,setOverlayClick,status,setStatus,id}){

    const [click,setClick] = useState(false);
    const [orders,setOrders] = useState([]);
    const [total,setTotal] = useState(0);
    const [user,setUser] = useState([]);
    
    useEffect(()=>{
        axios.get("http://localhost:4000/tables/" + JSON.parse(localStorage.getItem("user"))._id).then(res=>{
            setOrders(res.data.orders);
            setUser(res.data);
            setStatus(res.data.status);
        }).catch(err=>{
            console.log("An error occured");
        })

    },[orders]);

    const handleExit = ()=>{
        setClick(!click)
    }

    const handleReadyStatus = ()=>{
        setStatus(!status);
        setOverlayClick(!overlayClick);
        handleStatus({id,status});
    }

    return(
        <>
            {
                click ? null : 
                <IconContext.Provider value={{style:{fontSize:"23px",color:"#e74c3c",cursor:"pointer"}}}>
                <div className={`check-overlay`}>
                    <Container>
                        <div className="check-header col-lg-12">
                            <h3 className="text-center">Smart Menu Check</h3>
                            <FaTimes onClick={handleExit}/>
                        </div>
                        <div className="col-lg-12 button-header">
                            <button className="ready-button" onClick={handleReadyStatus}>Ready</button>
                        </div>
                        <div className="col-lg-12 check-div">
                            {
                                orders.map((order)=>
                                    <div key={order._id}>
                                    <CheckItem order={order} total={total} setTotal={setTotal}/>
                                    </div>
                                )
                            }

                            <div className="total">
                                {
                                    orders.length === 0 ? <h3>You Should Order Something First!</h3> : <>
                                        <p>Total Amount</p>
                                        <p>{total}</p>
                                     </>
                                }
                            </div>
                        </div>
                    </Container>
                </div>
                </IconContext.Provider>
            }
        </>
    )
}

export default Check;