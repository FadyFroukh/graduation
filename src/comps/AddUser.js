import React, { useState } from 'react';
import swal from 'sweetalert';
import Button from './pages/Button';
import axios from 'axios';
function AddUser(){

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [rule,setRule] = useState("");

    const rules = [0,1,2];

    const handleAddForm = (e)=>{
        e.preventDefault();
        if (username.trim() === "" || password.trim() === "" || rule.trim() === ""){
            swal({title:"Empty Fields",text:"Check every input field and try again",icon:"error"});
        }
        else if (!rules.includes(Number(rule))){
            swal({title:"Wrong Rule Type",text:`Check your rule , rules available ${rules}`,icon:"error"});
        }
        else {
            axios.post("http://localhost:4000/users",{username,password,rule,status:false}).then(res=>{
                swal({title:"User Added Successfully", text:`New User ${username} added to the database` , icon:"success"});
                setUsername("");
                setPassword("");
                setRule("");
            }).catch(err=>{
                swal({title:"Something went wrong..",text:"An error occured while trying to add the user",icon:"error"});
            })
        }
    }

    const handleUsername = (e)=>{
        setUsername(e.target.value);
    }
    const handlePassword = (e)=>{
        setPassword(e.target.value);
    }
    const handleRule = (e)=>{
        setRule(e.target.value);
    }

    return(
        <>
        <main className="add-user-overlay">
            <Button btnText="Go Back" btnWidth="150px" btnHeight="70px" btnLink="/admin"/>
            <h3>Add a new user to the database</h3>
            <form className="add-user-form" onSubmit={handleAddForm} > 
                <div className="form-part">
                    <label>Username</label>
                    <input value={username} onChange={handleUsername} maxLength="20"/>
                </div>
                <div className="form-part">
                    <label>Password</label>
                    <input value={password} onChange={handlePassword} maxLength="20"/>
                </div>
                <div className="form-part">
                    <label>Rule</label>
                    <input value={rule} onChange={handleRule} maxLength="1"/>
                </div>
                <div className="form-part submit-part">
                    <button type="submit">Add User</button>
                </div>
            </form>
        </main>
        </>

    );
}

export default AddUser;