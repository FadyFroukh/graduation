import axios from 'axios';
import React, {useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import {FaPlusCircle,FaInfoCircle} from 'react-icons/fa';
import swal from 'sweetalert';


function TableIcons({mealName,mealPrice}){
    
    const [checkMeal,setCheckMeal] = useState("");
    const [checkPrice,setCheckPrice] = useState(0);

    const [cookies,setCookie] = useCookies(["tableID","total"]);


    useEffect(()=>{
        setCheckMeal(mealName);
        setCheckPrice(mealPrice);

        if (cookies.total === undefined){
            setCookie("total"," ",{path:"/menu",sameSite:"strict"});
        }
        
    },[mealName,mealPrice,cookies.total])

    const handleAddToCheck = ()=>{
        axios.post("http://localhost:3001/items",{
            itemName:checkMeal,
            itemPrice:checkPrice,
            addedAt:new Date(),
            tableID:cookies.tableID
        }).then(res=>{
          console.log(res.data);
          swal({title:"Meal Added Successfully",text:`Added ${mealName} to the check`,icon:"success"});
          setCookie("total",Number(cookies.total) + Number(checkPrice),{path:"/menu", sameSite:"strict"});
        }).catch(err=>{
            swal({title:"Something went wrong",text:"Contact the staff please",icon:"error"});
        })

        
    }

    const handleShowInfo = ()=>{
        alert(typeof(cookies.tableID));
    }

    return(
        <>
            <div className="icons">
                <FaPlusCircle onClick={handleAddToCheck}/>
                <FaInfoCircle onClick={handleShowInfo}/>
            </div>
        </>
    );
}

export default TableIcons;

