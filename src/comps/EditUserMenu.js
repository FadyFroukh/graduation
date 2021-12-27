import React , {useState} from 'react';
import ExitHeader from './ExitHeader';
import axios from 'axios';
import swal from 'sweetalert';

function EditUserMenu({showMenu,setShowMenu,id}){

    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [rule,setRule] = useState(0);
 

    const handleName = (e)=>{
        setName(e.target.value);
    }   

    const handlePassword = (e)=>{
        setPassword(e.target.value);
    }

    const handleRule = (e)=>{
        setRule(e.target.value);

    }


    const handleSubmit = (e)=>{
        e.preventDefault();

        if(name === "" || password === "" || rule === ""){
            swal({title:"Empty Fields",text:"Check every input field and try again",icon:"error"});
        }else if(rule < 0 || rule > 2){
            swal({title:"Wrong Rule",text:"Avaialable Rules Are : 0 for User , 1 for Waiter , 2 for Admin",icon:"error"})
        }
        else{
            axios.put("http://localhost:4000/users",{
                id,
                name,
                password,
                rule
                
            }).then(res=>{
    
            }).catch(()=>{
                console.log("An error occured");
            })
    
            setShowMenu(!showMenu);
        }
    }

    return(
        <>
            <div className="edit-user-form">
                <ExitHeader showMenu={showMenu} setShowMenu={setShowMenu}/>
                <h2>Edit a meal inside the database</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-part">
                        <label htmlFor="name">Username</label>
                        <input type="text" name="name" maxLength="25" value={name} onChange={handleName}/>
                    </div>
                    <div className="form-part">
                        <label htmlFor="password">Password</label>
                        <input type="text" name="password" maxLength="25" value={password} onChange={handlePassword}/>
                    </div>
                    <div className="form-part">
                        <label htmlFor="rule">Rule</label>
                        <input type="text" name="rule" maxLength="1" value={rule} onChange={handleRule}/>
                    </div>
                    <div className="form-part submit-part">
                        <button type="submit">Edit User</button>
                    </div>

                </form>
            </div>

        </>
        );
}

export default EditUserMenu;