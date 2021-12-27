import React , {useState} from 'react';
import ExitHeader from './ExitHeader';
import axios from 'axios';
import swal from 'sweetalert';

function EditMealMenu({showMenu,setShowMenu,id}){

    const [mealName,setMealName] = useState("");
    const [mealCat,setMealCat] = useState("");
    const [mealPrice,setMealPrice] = useState("");
    const [mealInfo,setMealInfo] = useState("");

    const handleMealName = (e)=>{
        setMealName(e.target.value);
    }   

    const handleMealCat = (e)=>{
        setMealCat(e.target.value);
    }

    const handleMealPrice = (e)=>{
        setMealPrice(e.target.value);

    }

    const handleMealInfo = (e)=>{
        setMealInfo(e.target.value);
    }

    const cats = ["main","desserts","sweets","shishas","drinks"]


    const handleSubmit = (e)=>{
        e.preventDefault();

        if(mealName === "" || mealCat === "" || mealPrice === "" || mealInfo === "" ){
            swal({title:"Empty Fields",text:"Check every input field and try again",icon:"error"});
        }else if (!cats.includes(mealCat)){
            swal({title:"Meal Category Not Availble",text:`Try those: ${cats}`,icon:"error"});
        }
        else{
            axios.put("http://localhost:4000/meals",{
                id,
                mealName,
                mealCat,
                mealPrice,
                mealInfo
            }).then(res=>{
    
            }).catch(()=>{
                console.log("An error occured");
            })
    
            setShowMenu(!showMenu);
        }
    }

    return(
        <>
            <div className="edit-meal-form">
                <ExitHeader showMenu={showMenu} setShowMenu={setShowMenu}/>
                <h2>Edit a meal inside the database</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-part">
                        <label htmlFor="meal-name">Meal Name</label>
                        <input type="text" name="meal-name" maxLength="25" value={mealName} onChange={handleMealName}/>
                    </div>
                    <div className="form-part">
                        <label htmlFor="meal-cat">Meal Category</label>
                        <input type="text" name="meal-cat" maxLength="10" value={mealCat} onChange={handleMealCat}/>
                    </div>
                    <div className="form-part">
                        <label htmlFor="meal-price">Meal Price</label>
                        <input type="text" name="meal-price" maxLength="5" value={mealPrice} onChange={handleMealPrice}/>
                    </div>
                    <div className="form-part">
                        <label htmlFor="meal-info">Meal Information</label>
                        <input type="text" name="meal-info" maxLength="50" value={mealInfo} onChange={handleMealInfo}/>
                    </div>
                    <div className="form-part submit-part">
                        <button type="submit">Edit Meal</button>
                    </div>

                </form>
            </div>

        </>
        );
}

export default EditMealMenu;