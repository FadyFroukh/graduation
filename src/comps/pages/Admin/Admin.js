import React , {useEffect , useState} from 'react';
import "../../../css/Admin.css";
import Button from '../Button';
import Container from '../../Container';
import AdminTable from '../../AdminTable';
import {fetchTables,handleLogout} from '../Utils';
function Admin(){

     const [user,setUser] = useState({});
 
     useEffect(()=>{
       var u = localStorage.getItem("user");
       if (u){
         setUser(JSON.parse(u));
       }
     },[])

     const [users,setUsers] = useState([]);
     const [date,setDate] = useState();

     useEffect(()=>{
         fetchTables(setUsers);
         setDate(new Date().toLocaleDateString())
     },[users])
 

    return (
        <>
            <Container>
                <header className="admin-page-header">
                    <p>Admin : <b>{user.name}</b></p>
                    <button onClick={handleLogout}>Log Out</button>
                    <div className="login-time">Logged in at <span>{date}</span></div>
                </header>

                <div className="col-lg-4 meals">
                    <h4 className="text-center">Meals Managment</h4>
                    <div className="add-meal-btn operation">
                        <Button btnText="Add a Meal" btnHeight="170px" btnWidth="100%" btnLink="/admin/addmeal"/>
                    </div>
                    <div className="remove-meal-btn operation">
                        <Button btnText="Remove or Edit a Meal" btnHeight="170px" btnWidth="100%" btnLink="/admin/editmeal"/>
                    </div>
                </div>
                <div className="col-lg-4 tables">
                    <h4 className="text-center">Today's Tables</h4>
                    {
                        users.map((user,index)=>
                            <div className="admin-table" key={index}>
                                <AdminTable user={user}/>
                            </div>
                        )
                    }
                </div>
            <div className="col-lg-4 users">
                <h4 className="text-center">Users Managment</h4>
                <div className="add-meal-btn operation">
                    <Button btnText="Add a User" btnHeight="170px" btnWidth="100%" btnLink="/admin/adduser"/>
                </div>
                <div className="remove-meal-btn operation">
                    <Button btnText="Remove or Edit a User" btnHeight="170px" btnWidth="100%" btnLink="/admin/edituser"/>
                </div>
            </div>
            </Container>
        </>
    );

}

export default Admin;