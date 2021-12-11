import React , {useEffect , useState} from 'react';
import "../../../css/Admin.css";
import Button from '../Button';
import Container from '../../Container';
import axios from 'axios';
import AdminTable from '../../AdminTable';
function Admin(){

    const handleLogOut = ()=>{
        localStorage.removeItem("user");
        localStorage.removeItem("isLogin");
        window.location.href = "/";
     }
 
     const [user,setUser] = useState({});
 
     useEffect(()=>{
       var u = localStorage.getItem("user");
       if (u){
         setUser(JSON.parse(u));
       }
     },[])

     const [users,setUsers] = useState([]);

     useEffect(()=>{
         axios.get("http://localhost:4000/tables").then(res=>{
             setUsers(res.data);
         }).catch(err=>{
             console.log("An error occured");
         })
     },[users])
 

    return (
        <>
            <Container>
                <header className="admin-page-header">
                    <p>Admin : {user.name}</p>
                    <button onClick={handleLogOut}>Log Out</button>
                    <div className="login-time">Logged in at {new Date().getDate()}</div>
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
                <div className="col-lg-4 tables section">
                    <h4 className="text-center">Today's Tables</h4>
                   
                </div>
            <div className="col-lg-4 users section">
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