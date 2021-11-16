import React , { useEffect, useState } from 'react';
import Container from "./Container";
import Button from  "./pages/Button";
import {useCookies} from 'react-cookie';
import axios from "axios";

function AdminControl({items}){

    const [cookies,removeCookie] = useCookies(["username","password"]);

    const handleLogOut = ()=>{
         alert("Why work before now no??");
    }

    const [error,setError] = useState(false);
    const [tables,setTables] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:4000/tables").then(res=>{
            setTables(res.data);
        }).catch(err=>{
            setError(true);
        })
    },[cookies.password , cookies.username])

    return(
        <Container>
            <header className="admin-page-header">
                <p>Waiter : {cookies.username}</p>
                <button onClick={handleLogOut}>Log Out</button>
                <div className="login-time">Logged in at {new Date().getDate()}</div>
            </header>
            <div className="col-lg-4 meals-database">
                <h4 className="text-center">Database Managment</h4>
                <div className="add-meal-btn section">
                    <Button btnText="Add a Meal" btnHeight="170px" btnWidth="100%" btnLink="/admin/add"/>
                </div>
                <div className="remove-meal-btn section">
                    <Button btnText="Remove or Edit a Meal" btnHeight="170px" btnWidth="100%" btnLink="/admin/edit"/>
                </div>
            </div>
            <div className="col-lg-4 tables section">
                <h4 className="text-center">Today's Tables</h4>
                <div className="section">
                    {
                        tables.map((table,index)=>
                            <div key={index}>
                                <p>Table-{index+1} {table.tableID}</p>
                                <div>
                                    {
                                        items.map((item,index)=>
                                            Number(table.tableID) === Number(item.tableID) ? 
                                            <p key={index}>{item.itemName}</p> : null
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        <div className="col-lg-4 other-data section">
            <h4 className="text-center">Some Other Data</h4>
        </div>
    </Container>
    );
}

export default AdminControl;