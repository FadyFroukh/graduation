import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {FaTimes } from 'react-icons/fa';
import "../css/Menu.css";
import Ingredient from './Ingredient';
import swal from 'sweetalert';
function MealComps({ingdsClick,setIngdsClick,mealId}){

    const [ingds,setIngds] = useState([]);
    const [addedIngds,setAddedIngds] = useState([]);
    const [mealName,setMealName] = useState("");
    const [mealPrice,setMealPrice] = useState(0);

    useEffect(()=>{
        axios.get("http://localhost:4000/meals/" + mealId).then(res=>{
            setIngds(res.data.itemIngds);
            setMealName(res.data.itemName);
            setMealPrice(res.data.itemPrice);
        }).catch(()=>{
            console.log("Error Fetching Ingds");
        })
    },[])


    const handleIngdsMenu = ()=>{
        setIngdsClick(!ingdsClick);
    }

    const handleAddToCheck = ()=>{
        axios.post("http://localhost:4000/orders",{
            itemName:mealName,
            itemPrice:mealPrice,
            addedAt:new Date(),
            table:JSON.parse(localStorage.getItem("user"))._id,
            ingds:addedIngds
        }).then(res=>{
        swal({title:"Meal Added Successfully",text:`Added ${mealName} to the check`,icon:"success"});
        }).catch(err=>{
            swal({title:"Something went wrong",text:"Contact the staff please",icon:"error"});
        });
        setIngdsClick(!ingdsClick);
        setAddedIngds([]);
    }

    return(
        <div className='meal-comps'>
            <header>
                <h3>Ingredients Menu</h3>
                <FaTimes size="27" onClick={handleIngdsMenu}/>
            </header>
            <div className='meal-ingds'>
                <div className='meal-ingds-container'>
                    {
                        ingds?.length > 0 ? 
                        ingds?.map((ingd,index)=>
                            <div key={index}>
                                <Ingredient ingd={ingd} setAddedIngds={setAddedIngds} addedIngds={addedIngds} mealName={mealName}/>
                            </div>
                        ) : 
                        <div className='no-ingds'>
                            <h3 className='text-center'>No added Ingredients</h3>
                        </div>
                    }
                </div>
                <button onClick={handleAddToCheck}>Order Meal</button>
            </div>
        </div>
    );
}

export default MealComps;