import React , {useState} from 'react';
import EditMealMenu from './EditMealMenu';
import Meal from './Meal';
import Button from './pages/Button';

function EditMeal({menu}){

    const [showMenu,setShowMenu] = useState(false);

    return(
        <>
            <main className="edit-meal-overlay">
                <Button btnLink="/admin" btnText="Go Back" btnWidth="150px"/>
                <h2>Edit or Remove a meal from the database</h2>
                <div className="edit-meals">
                    {
                        menu.map((meal,index)=>
                            <>
                                <Meal meal={meal} key={index} showMenu={showMenu} setShowMenu={setShowMenu}/>
                            </>
                        )
                    }
                </div>
                {
                showMenu ? <EditMealMenu showMenu={showMenu} setShowMenu={setShowMenu}/> : null
                }
            </main>
        </>
    );
}

export default EditMeal;