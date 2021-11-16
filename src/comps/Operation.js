import React , {useState, useEffect} from 'react';
import AddMeal from './AddMeal';
import EditMeal from './EditMeal';
import "../css/Operation.css";
import axios from 'axios';
import AdminDatabase from './AdminDatabase';

function Operation({match}){

    const [menu,setMenu] = useState([]);
    const [databaseError,setDatabaseError] = useState(false);

    useEffect(()=>{
        axios.get("http://localhost:4000/menu").then(res=>{
            setMenu(res.data);
        }).catch(err=>{
            setDatabaseError(!databaseError);
        })
    },[menu])

    if(databaseError){
        return(
            <AdminDatabase/>
        );
    }else {
        if(match.params.id === "add"){
            return(
                <AddMeal menu={menu}/>
            );
        }else {
            return(
                <EditMeal menu={menu}/>
            )
        }
    }
}

export default Operation;