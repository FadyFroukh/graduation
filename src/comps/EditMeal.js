import React , {useState} from 'react';
import EditMealMenu from './EditMealMenu';
import Meal from './Meal';
import Button from './pages/Button';

function EditMeal({menu}){

    const [showMenu,setShowMenu] = useState(false);
    const [id,setId] = useState("");

    return(
        <>
            <main className="edit-meal-overlay">
                <Button btnLink="/admin" btnText="Go Back" btnWidth="150px"/>
                <h2>Edit or Remove a meal from the database</h2>
                <div className="edit-meals">
                    {
                        menu.map((meal,index)=>
                            <div key={index}>
                                <Meal meal={meal} showMenu={showMenu} setShowMenu={setShowMenu} setId={setId}/>
                            </div>
                        )
                    }
                </div>
                {
                showMenu ? <EditMealMenu showMenu={showMenu} setShowMenu={setShowMenu} id={id}/> : null
                }
            </main>
        </>
    );
}

export default EditMeal;