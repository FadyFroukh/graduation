import React from 'react';

function Container(props){
    return(
        <>
            <div className="container">
                <div className={props.isCenter ? `row justify-content-center align-items-center` : "row"}>
                    {props.children}
                </div>
            </div>
        </>
    )
}

export default Container;