import React from 'react';
import Meal from './Meal';
import Button from './pages/Button';

function EditMeal({menu}){

    return(
        <>
            <main className="edit-meal-overlay">
                <Button btnLink="/admin" btnText="Go Back" btnWidth="150px"/>
                <h2>Edit or Remove a meal from the database</h2>
                <div className="edit-meals">
                    {
                        menu.map((meal,index)=>
                            <>
                                <Meal meal={meal} key={index}/>
                            </>
                        )
                    }
                </div>
            </main>
        </>
    );
}

export default EditMeal;