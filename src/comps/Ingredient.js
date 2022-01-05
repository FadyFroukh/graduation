import React from 'react';
import swal from 'sweetalert';

function Ingredient({ingds,addedIngds,setAddedIngds,mealName,clickCount,setClickCount,count}){


    function move(){
        if(clickCount < count-1){
            setClickCount((clickCount)=>clickCount+=1);
        }else{
            setClickCount(0);
        }
    }

    const handleAddIngd = ()=>{
        if(addedIngds.indexOf(ingds[clickCount]) === -1){
            setAddedIngds((addedIngds)=>[...addedIngds,ingds[clickCount]]);
            swal({title:"Ingredient Added Successfully",text:`Added ${ingds[clickCount]} to your ${mealName}`,icon:"success"});
            setTimeout(()=>{
                move();
            },500)
        }else {
            swal({title:"Ingredient Already Added !",text:`Added ${ingds[clickCount]} to your ${mealName}`,icon:"info"});
            move();
        }
    }

    return(
        <div className='ingd' onClick={handleAddIngd}>
            <img src={`http://localhost:3000/images/ingredients/${ingds[clickCount]}.png`} alt="Ingredient"/>
            <p className='ingd-name'><b>{ingds[clickCount]}</b></p>
        </div>
    );
}

export default Ingredient;