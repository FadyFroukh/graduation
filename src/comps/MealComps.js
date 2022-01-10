import React, { useEffect,useState } from 'react';
import {FaArrowAltCircleLeft, FaArrowAltCircleRight, FaTimes } from 'react-icons/fa';
import "../css/Menu.css";
import Ingredient from './Ingredient';
function MealComps({ingdsClick,setIngdsClick,displaySelect,mealName,orderMeals,ingds,addedIngds,setAddedIngds,getMeal,setCounter})
{

    useEffect(()=>{
        getMeal();
    },[])

    const [clickCount,setClickCount] = useState(0);
    const count = ingds.length;

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

    const handleClickRight = ()=>{
        if(clickCount < count-1){
            setClickCount((clickCount)=>clickCount+=1);
        }else {
            setClickCount(0);
        }
    }
    const handleClickLeft = ()=>{
        if(clickCount === 0){
            setClickCount(count-1);
        }else{
            setClickCount((clickCount)=>clickCount-=1);
        }
    }

    return(
        <div className='meal-comps'>
            <header>
                <h3>Ingredients Menu</h3>
                <FaTimes size="27" onClick={handleIngdsMenu}/>
            </header>
            <div className='meal-ingds'>
                <h5>Ordering `<b>{mealName}</b>`</h5>
                <div className='meal-ingds-container'>
                    <FaArrowAltCircleLeft size="40" onClick={handleClickLeft} style={{right:"100%"}}/>
                    {
                        ingds.length > 0 ? <Ingredient ingds={ingds} setAddedIngds={setAddedIngds} addedIngds={addedIngds} mealName={mealName}
                            clickCount={clickCount} setClickCount={setClickCount} count={count}
                        /> : null
                    }
                   <FaArrowAltCircleRight size="40" onClick={handleClickRight} style={{left:"100%"}}/>
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