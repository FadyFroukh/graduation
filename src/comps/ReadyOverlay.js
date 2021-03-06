import React from "react";
import "../css/ReadyOverlay.css";
import { handleStatus } from "./pages/Utils";

function ReadyOverlay({overlayClick,setOverlayClick,status,setStatus,id}){

    const handleReadyStatus = ()=>{
        setStatus(!status);
        setOverlayClick(!overlayClick);
        handleStatus({id,status});
    }

    const closeOverlay = ()=>{
        handleReadyStatus();
    }


    return(
        <div className="ready-overlay" onDoubleClick={closeOverlay}>
            <div className="msg-overlay">
                <h1>Thank You For Being Here!</h1>
                <h3>Double Click to Exit to Menu</h3>
                <h5>Your Order Should Be Ready Soon!</h5>
            </div>
        </div>
    );
}

export default ReadyOverlay;