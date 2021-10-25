import React from 'react';
import { Link } from 'react-router-dom';
import "../../css/Button.css";
function Button({btnText,btnLink,btnWidth,btnHeight,isCenter,marginTop}){ 
    return(
        <>
            <div className="btn-container" style={{marginTop:marginTop}}>
                <p className="btn-para" style={isCenter ? {justifyContent:"center"} : {justifyContent:"flex-start"}}>
                    <Link to={btnLink} style={{width:btnWidth,height:btnHeight}}>{btnText}</Link>
                </p>
            </div>
        </>
    )
}

export default Button;