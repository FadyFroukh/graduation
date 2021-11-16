import React , {useState} from 'react';
import "../css/Check.css";
import Container from '../comps/Container';
import {FaTimes} from 'react-icons/fa';
import {IconContext} from 'react-icons/lib';
import {useCookies} from 'react-cookie';
import CheckItem from './CheckItem';
import axios from 'axios';
function Check({items}){

    const [click,setClick] = useState(false);
    const [cookies,setCookie] = useCookies();


    const handleExit = ()=>{
        setClick(!click)
    }

    const checkOut = ()=>{
        
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
                        <div className="col-lg-12 check-div">
                            {
                                items.map((item,index)=>
                                    <CheckItem key={index} item={item}/>
                                )
                            }
                            <div className="total">
                                {
                                    items.length === 0 ? <h3>You Should Order Something First!</h3> : <>
                                        <p>Total Amount</p>
                                        <p>{cookies.total}$</p>
                                     </>
                                }
                            </div>
                        </div>
                        <div className="col-lg-12 check-out">
                            <button onClick={checkOut}>Check Out !</button>
                        </div>

                    </Container>
                </div>
                </IconContext.Provider>
            }
        </>
    )
}

export default Check;