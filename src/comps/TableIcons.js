import axios from 'axios';
import React from 'react';
import {FaPlusCircle,FaInfoCircle} from 'react-icons/fa';
import swal from 'sweetalert';

function TableIcons({meal,ingdsClick,setIngdsClick,setMealId}){
    
    const handleIngdsMenu = ()=>{
        setMealId(meal._id);
        if(ingdsClick === false){
            setIngdsClick(!ingdsClick);
        }else{
            axios.post("http://localhost:4000/orders",{
            itemName:meal.itemName,
            itemPrice:meal.itemPrice,
            addedAt:new Date(),
            table:JSON.parse(localStorage.getItem("user"))._id
            }).then(res=>{
            console.log(res.data);
            swal({title:"Meal Added Successfully",text:`Added ${meal.itemName} to the check`,icon:"success"});
            }).catch(err=>{
                swal({title:"Something went wrong",text:"Contact the staff please",icon:"error"});
            })
        }
    }

    const handleShowInfo = ()=>{
        swal({title:meal.itemName,text:meal.itemInfo,icon:"info"})
    }

    return(
        <>
            <div className="icons">
                <FaPlusCircle onClick={handleIngdsMenu}/>
                <FaInfoCircle onClick={handleShowInfo}/>
            </div>
        </>
    );
}

export default TableIcons;

