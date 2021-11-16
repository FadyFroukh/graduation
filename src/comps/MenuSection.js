import React, {useState} from 'react';
import {IconContext} from 'react-icons/lib';
import "../css/MenuSection.css";
import TableIcons from './TableIcons';

function MenuSection({heading,meals,divClass,isAdmin}){

    //States

    const [search,setSearch] = useState("");
    const [newMeals,setNewMeals] = useState([]);

    const handleInput = (e)=>{
        setSearch(e.target.value);
        setNewMeals(meals.filter(meal=>meal.itemName === e.target.value));
    }

    const handleForm = (e)=>{
        e.preventDefault();
    }


    return(
        <>
        <IconContext.Provider value={{size:40, style:{paddingLeft:"15px"}}}>
            <div className={`meals-div ${divClass}`}>
                <h4 className="text-center">{heading}</h4>
                <form className="meals-form" onSubmit={handleForm}>
                    <input type="text" placeholder="Search Something" value={search} onChange={handleInput}/>
                </form>
                <div className="meals">
                    {
                        search === "" ?  
                            <>
                                {
                                    meals.length === 0 ? 
                                    <>
                                        <div className="no-meals">
                                            <h4>No items added Yet</h4>
                                            <p>Contact any staff for more information</p>
                                        </div>
                                    </>
                                    :
                                    meals.map((meal,index)=>
                                    <div className="meal-item" key={index}>
                                        <div className="meal-name">{meal.itemName}</div>
                                        <div className="price">{meal.itemPrice}</div>
                                        <TableIcons mealName={meal.itemName} mealPrice={meal.itemPrice}/>
                                    </div>
                                    )
                                }
                            </>
                        : 
                            <>
                                {
                                    newMeals.map((meal,index)=>
                                    <div className="meal-item" key={index}>
                                        <p className="meal-name">{meal.itemName}</p>
                                        <p className="price">{meal.itemPrice}$</p>
                                        <div className="icons">
                                            <TableIcons mealName={meal.itemName}/>
                                        </div>
                                    </div>
                                    )
                                }
                            </>
                    }
                </div>
            </div>
        </IconContext.Provider>
        </>
    );
}

export default MenuSection;