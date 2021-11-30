import axios from 'axios';
import React, {useEffect, useState } from 'react';
import {FaPlusCircle,FaInfoCircle} from 'react-icons/fa';
import swal from 'sweetalert';


function TableIcons({mealName,mealPrice,mealInfo}){
    
    const [checkMeal,setCheckMeal] = useState("");
    const [checkPrice,setCheckPrice] = useState(0);

    useEffect(()=>{
        setCheckMeal(mealName);
        setCheckPrice(mealPrice);
    },[mealName,mealPrice])

    const handleAddToCheck = ()=>{
        axios.post("http://localhost:4000/orders",{
            itemName:checkMeal,
            itemPrice:checkPrice,
            addedAt:new Date(),
            table:JSON.parse(localStorage.getItem("user"))._id
        }).then(res=>{
          console.log(res.data);
          swal({title:"Meal Added Successfully",text:`Added ${mealName} to the check`,icon:"success"});
        }).catch(err=>{
            swal({title:"Something went wrong",text:"Contact the staff please",icon:"error"});
        })
    }

    const handleShowInfo = ()=>{
        swal({title:"Meal Information",text:mealInfo,icon:"info"})
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

