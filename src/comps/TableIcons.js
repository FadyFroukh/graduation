import React from 'react';
import {FaPlusCircle,FaInfoCircle} from 'react-icons/fa';
import swal from 'sweetalert';

function TableIcons({meal,ingdsClick,setIngdsClick,setMealId,countClick,setCountClick}){
    
    const handleIngdsMenu = ()=>{
        setMealId(meal._id);
        if(meal.itemCat === "main"){
            setIngdsClick(!ingdsClick);
        }else{
            setCountClick(!countClick);
        }
    }

    const handleShowInfo = ()=>{
        swal({title:meal.itemName,text:meal.itemInfo,icon:"info"})
    }

    return(
        <>
            <div className="icons">
                <FaPlusCircle onClick={handleIngdsMenu}/>
                <FaInfoCircle onClick={handleShowInfo} />
            </div>
        </>
    );
}

export default TableIcons;

