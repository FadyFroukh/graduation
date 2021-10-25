import React from 'react';
import "../css/CheckButton.css";
import swal from '@sweetalert/with-react';
import {IconContext} from 'react-icons/lib';
import {FaTrash} from 'react-icons/fa';
import {useCookies} from 'react-cookie';
function CheckButton({isStart,items}){

    const [cookies] = useCookies(["tableID","total"]);


    function seeCheck(){
        
    }



    return (
        <>
        <div className="col-lg-6 header-btn" style={isStart ? {justifyContent:"flex-start"} : {justifyContent:"center"}}>
            <button onClick={seeCheck}>See Check</button>
        </div>
        </>
    );
}

export default CheckButton;