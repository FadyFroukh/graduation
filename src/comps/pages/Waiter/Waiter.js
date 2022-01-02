import React , {useState,useEffect} from 'react';
import Container from '../../Container';
import "../../../css/Waiter.css";
import {Link} from 'react-router-dom'
import { fetchTables,handleLogout } from '../Utils';
function Waiter(){

    const [users,setUsers] = useState([]);

    useEffect(()=>{
        fetchTables(setUsers);
    },[users])


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
                            users?.map((user,index)=>
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