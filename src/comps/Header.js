import React from 'react';
import "../css/Header.css";
function Header({name}){
    return(
        <>
            <nav>
                <div className="nav-container">
                    <div className={`nav-text`}>
                        <span className="move-right">Welcome To {name}</span>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;