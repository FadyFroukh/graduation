import React, { useEffect } from 'react';
import {FaTimes } from 'react-icons/fa';
import "../css/Menu.css";
import Ingredient from './Ingredient';
function MealComps({ingdsClick,setIngdsClick,displaySelect,mealName,orderMeals,ingds,addedIngds,setAddedIngds,getMeal,setCounter})
{

    useEffect(()=>{
        getMeal();
    },[])

    const handleCounter = (e)=>{
        setCounter(e.target.value);
    }

    const handleIngdsMenu = ()=>{
        setIngdsClick(!ingdsClick);
    }

    const handleAddToCheck = ()=>{
       orderMeals();
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
                <div className='orders-counter'>
                    <label>Number of Meals : </label>
                    <select onChange={handleCounter}>
                        {
                            displaySelect()
                        }
                    </select>
                </div>
            </div>
        </div>
    );
}

export default MealComps;