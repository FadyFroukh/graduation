import React , {useState, useEffect} from 'react';
import AddMeal from './AddMeal';
import EditMeal from './EditMeal';
import "../css/Operation.css";
import axios from 'axios';
import AdminDatabase from './AdminDatabase';
import AddUser from './AddUser';
import EditUser from './EditUser';

function Operation({match}){

    const [menu,setMenu] = useState([]);
    const [users,setUsers] = useState([]);
    const [databaseError,setDatabaseError] = useState(false);

    useEffect(()=>{
        axios.get("http://localhost:4000/meals").then(res=>{
            setMenu(res.data);
        }).catch(err=>{
            setDatabaseError(!databaseError);
        })

        axios.get("http://localhost:4000/users").then(res=>{
            setUsers(res.data);
        }).catch(err=>{
            setDatabaseError(true);
        })


    },[menu])

    if(databaseError){
        return(
            <AdminDatabase/>
        );
    }else {
        if(match.params.id === "addmeal"){
            return(
                <AddMeal menu={menu}/>
            );
        }else if(match.params.id === "editmeal") {
            return(
                <EditMeal menu={menu}/>
            )
        } else if (match.params.id === "adduser"){
            return(
                <AddUser/>
            )
        }
        else if (match.params.id === "edituser"){
            return(
                <EditUser users={users}/>
            )
        }
    }
}

export default Operation;