import React , {useEffect , useState} from 'react';
import "../../../css/Admin.css";
import axios from 'axios';
import AdminDatabase from '../../AdminDatabase';
import AdminControl from '../../AdminControl';
import AdminForm from '../../AdminForm';
import {useCookies} from 'react-cookie';

function Admin(){

    const [databaseError,setDatabaseError] = useState(false);
    const [isLogged,setIsLogged] = useState(false);
    const [admins,setAdmins] = useState([]);

    const [cookies] = useCookies(["username","password"]);


    useEffect(()=>{
        axios.get("http://localhost:4000/admins").then(res=>{
            setAdmins(res.data);
        }).catch(err=>{
            setDatabaseError(true);
        })
        if(cookies.username !== undefined && cookies.password !== undefined){
            setIsLogged(!isLogged);
        }
    },[])

    const [items,setItems] = useState([]);

    useEffect(()=>[
        axios.get("http://localhost:4000/items").then(res=>{
            setItems(res.data);
        }).catch(err=>{
            setDatabaseError(true);
        })
    ],[])

    return (
        <>
        {
            databaseError ? <AdminDatabase/> : 
            isLogged ? <AdminControl items={items}/> : <AdminForm admins={admins} setIsLogged={setIsLogged} isLogged={isLogged}/>
        }
        </>
    );

}

export default Admin;