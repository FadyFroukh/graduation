import React from 'react';
import Container from './Container';
import {FaTrash,FaEdit} from 'react-icons/fa';

function EditMeal({menu}){
    return(
        <>
            <main className="edit-meal-overlay">
                <Container>
                    <div className="menu-meals">
                        {
                            menu.map((meal,index)=>
                               <div key={index} className="meal">
                                   <div className="meal-name">{meal.itemName}</div>
                                   <div className="meal-cat">{meal.itemCat}</div>
                                   <div className="meal-price">{meal.itemPrice}</div>
                                   <div className="meal-icons">
                                        <FaTrash/>
                                        <FaEdit/>
                                   </div>
                               </div>     
                            )
                        }
                    </div>
                </Container>
            </main>
        </>
    );
}

export default EditMeal;