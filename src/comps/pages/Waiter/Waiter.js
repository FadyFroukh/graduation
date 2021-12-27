import React , {useState,useEffect} from 'react';
import Container from '../../Container';
import "../../../css/Waiter.css";
import axios from 'axios';
import {Link} from 'react-router-dom'
function Waiter(){

    const [users,setUsers] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:4000/tables").then(res=>{
            setUsers(res.data);
        }).catch(err=>{
            console.log("An error occured");
        })
    },[users])

    const handleLogout = ()=>{
        localStorage.removeItem("user");
        localStorage.removeItem("isLogin");
        window.location.href = "/";        
    }

    return(
        <>
            <main className="waiter-page-overlay">
                <header>
                    <h2 className="text-center">Available Tables</h2>
                    <button onClick={handleLogout}>Logout</button>
                </header>
                <Container>
                    <div className="col-lg-4">
                        {
                            users.map((user,index)=>
                                <div key={index} className="table-status">
                                    <p>{user.name} </p>
                                    {
                                        user.status ? <p className="ready">Ready</p> : <p className="not-ready">Not Ready</p>
                                    }
                                </div> 
                            )
                        }
                    </div>
                </Container>
                <Container>
                {
                    users.map((user,index)=>
                    <div className="col-lg-4 table" key={index}>
                        <Link to={`waiter/${user._id}`}>
                            <div className="content">
                                <p className="table-name">{user.name}</p>
                            </div>
                        </Link>
                    </div>
                    )
                }
                </Container>
            </main>
        </>
    )
}
export default Waiter;