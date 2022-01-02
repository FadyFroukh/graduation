import React  from 'react';
import {IconContext} from 'react-icons/lib';
import "../css/MenuSection.css";
import TableIcons from './TableIcons';

function MenuSection({heading,meals,divClass,ingdsClick,setIngdsClick,setMealId,countClick,setCountClick}){

    return(
        <>
        <IconContext.Provider value={{size:40, style:{paddingLeft:"15px"}}}>
            <div className={`meals-div ${divClass}`}>
                <h4 className="text-center">{heading}</h4>
                <div className="meals">
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
                            <TableIcons meal={meal} ingdsClick={ingdsClick} setIngdsClick={setIngdsClick} setMealId={setMealId}
                            countClick={countClick} setCountClick={setCountClick}
                            />
                        </div>
                        )
                    }
                </div>
            </div>
        </IconContext.Provider>
        
        </>
    );
}

export default MenuSection;