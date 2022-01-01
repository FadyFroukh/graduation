import React from 'react';
import {FaPlusCircle} from 'react-icons/fa';
import swal from 'sweetalert';

function Ingredient({ingd,addedIngds,setAddedIngds,mealName}){

    const handleAddIngd = ()=>{
        if(addedIngds.indexOf(ingd) === -1){
            setAddedIngds((addedIngds)=>[...addedIngds,ingd]);
            swal({title:"Ingredient Added Successfully",text:`Added ${ingd} to your ${mealName}`,icon:"success"});
        }else {
            swal({title:"Ingredient Already Added !",text:`Added ${ingd} to your ${mealName}`,icon:"info"});
        }
    }

    return(
        <div className='ingd'>
            <p>{ingd}</p>
            <FaPlusCircle size="25" onClick={handleAddIngd}/>
        </div>
    );
}

export default Ingredient;