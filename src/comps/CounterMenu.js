import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

function CounterMenu({displaySelect,orderMeals,countClick,setCountClick,getMeal,setCounter})
{

    useEffect(()=>{
        getMeal();
    },[])

    const handleCounter = (e)=>{
        setCounter(e.target.value);
    }

    const handleCountMenu = ()=>{
        setCountClick(!countClick);
    }

    const handleAddToCheck = ()=>{
        orderMeals();
        setCountClick(!countClick);
    }

    return(
        <div className='counter-menu'>
            <div>
                <FaTimes size="30" onClick={handleCountMenu}/>
            </div>
            <div className='counter-body'>
                <h5>Choose Number of Items</h5>
                <select onChange={handleCounter}>
                    {displaySelect()}
                </select>
                <button onClick={handleAddToCheck}>Order Meal</button>
            </div>
        </div>
    );
}

export default CounterMenu;