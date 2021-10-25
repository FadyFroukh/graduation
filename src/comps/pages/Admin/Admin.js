import React, { useState , useEffect } from 'react';
import "../../../css/Admin.css";
import Container from '../../Container';
import Button from '../Button';
import {useCookies} from 'react-cookie';
import axios from 'axios';
function Admin(){

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState(false);
    const [admins,setAdmins] = useState([]);
    const [loginError,setLoginError] = useState("");
    const [isLogged,setIsLogged] = useState(false);
    const [tables,setTables] = useState([]);

    const [cookies, setCookie, removeCookie] = useCookies(["user","password"]);

    useEffect(()=>{

        axios.get("http://localhost:3001/admins").then(res=>{
            setAdmins(res.data);
        }).catch(err=>{
            setError(true);
        })

        axios.get("http://localhost:3001/items").then(res=>{
            setTables(res.data);
        }).catch(err=>{
            setError(true);
        })
        
        if (cookies.user === undefined && cookies.password === undefined){
            setIsLogged(false);
        }else {
            setIsLogged(true);
        }        

    },[cookies.password,cookies.user,username,password,admins,isLogged])
    

    const handlePassword = (e)=>{
        setPassword(e.target.value);
    }

    const handleUsername = (e)=>{
        setUsername(e.target.value);
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const admin = admins.filter(admin=> admin.name === username && admin.password === password);
        if (admin.length === 1) {
            setCookie("user",admin[0].name,{path:"/admin"});
            setCookie("password",admin[0].password,{path:"/admin"});
            setLoginError("");
            setPassword("");
            setUsername("");
        }else {
            setLoginError("User Not Found...");
        }
    }

    const handleLogOut = ()=>{
        removeCookie("user",{path:"/admin"});
        removeCookie("password",{path:"/admin"});
    }


    return(
        <>
            {error ? 
            <>
                <Container>
                    <div className="admin-error">
                        <h2>Something went wrong while trying to fetch data..</h2>
                        <p>Try checking internet connection..</p>
                        <p>Refreshing the page might help..</p>
                    </div>
                </Container>
            </> 
            : 
            <>
                {
                    isLogged ? 
                        <>
                            <Container>
                                <header className="admin-page-header">
                                    <p>Waiter : {cookies.user}</p>
                                    <button onClick={handleLogOut}>Log Out</button>
                                    <div className="login-time">Logged in at {}</div>
                                </header>
                                <div className="col-lg-4 meals-database">
                                    <h4 className="text-center">Database Managment</h4>
                                    <div className="add-meal-btn section">
                                        <Button btnText="Add a Meal" btnHeight="170px" btnWidth="100%" btnLink="/manage/add"/>
                                    </div>
                                    <div className="remove-meal-btn section">
                                        <Button btnText="Remove or Edit a Meal" btnHeight="170px" btnWidth="100%" btnLink="/manage/edit"/>
                                    </div>
                                </div>
                                <div className="col-lg-4 tables section">
                                    <h4 className="text-center">Today's Tables</h4>
                                    <div className="section">
                                        <ul>
                                            {
                                                tables.map((table,index)=>
                                                    <li key={index}>
                                                        {table.itemName}
                                                    </li>    
                                                )
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-4 other-data section">
                                    <h4 className="text-center">Some Other Data</h4>
                                </div>
                            </Container>
                        </>
                    :
                        <main className="admin-page-overlay">
                            <Container>
                                <Button btnText="Go Back" btnLink="/" btnWidth="150px" btnHeight="70px" isCenter={false}/>
                                <div className="col-lg-12 form-div">
                                    <form className="login-form" onSubmit={handleSubmit}>
                                        <h3>Login as Admin</h3>
                                        {
                                            loginError === "" ? null : <div className="alert alert-danger">{loginError}</div>
                                        }
                                        <div className="form-part">
                                            <label>Admin Username</label>
                                            <input type="text" value={username} onChange={handleUsername} maxLength="20"/>
                                        </div>
                                        <div className="form-part">
                                            <label>Admin Password</label>
                                            <input type="password" value={password} onChange={handlePassword} maxLength="30"/>
                                        </div>
                                        <div className="form-part btn-cont">
                                            <button type="submit">Login</button>
                                        </div>
                                    </form>
                                </div>
                            </Container>
                        </main>
                }
            </>
            }
        </>
    );
}

export default Admin;