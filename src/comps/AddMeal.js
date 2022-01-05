import React , {useState}  from 'react';
import Button from './pages/Button';
import swal from 'sweetalert';
import axios from 'axios';

function AddMeal({menu}){

    const [mealName,setMealName] = useState("");
    const [mealCat,setMealCat] = useState("");
    const [mealPrice,setMealPrice] = useState("");
    const [mealInfo,setMealInfo] = useState("");
    const [ingds,setIngds] = useState("");

    const cats = ["main","desserts","sweets","shishas","drinks"];

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
    const handleIngds = (e)=>{
        setIngds(e.target.value);
    }

    const handleAddForm = (e)=>{
        e.preventDefault();
        if(mealName.trim() === "" || mealCat.trim() === "" || mealPrice.trim() === "" || mealInfo.trim() === ""){
            swal({title:"Empty Fields",text:"Check every input field and try again",icon:"error"});
        }else if (menu.filter(item=>item.itemName === mealName).length === 1){
            swal({title:"Meal Exists",text:"Meal already added to the database",icon:"error"});
        }else if (!cats.includes(mealCat)){
            swal({title:"Meal Category Not Availble",text:`Try those: ${cats}`,icon:"error"});
        }else {
            axios.post("http://localhost:4000/meals",{
                itemName:mealName,
                itemCat:mealCat,
                itemPrice:mealPrice,
                itemInfo:mealInfo,
                itemIngds:ingds.split(",")
            }).then(res=>{
                swal({title:"Meal Added Successfully",text:`Meal Added: ${mealName}`,icon:"success"});
                setMealName("");
                setMealCat("");
                setMealPrice("");
                setMealInfo("");
                setIngds("");
            }).catch(err=>{
                swal({title:"Something went wrong..",text:"An error occured while trying to add the meal",icon:"error"});
            })
        }
    }

    return(
        <>
        <main className="add-meal-overlay">
            <Button btnText="Go Back" btnWidth="150px" btnHeight="70px" btnLink="/admin"/>
            <h3>Add a new meal to the database</h3>
            <form className="add-meal-form" onSubmit={handleAddForm} > 
                <div className="form-part">
                    <label htmlFor="meal-name">Meal Name</label>
                    <input type="text" name="meal-name" maxLength="50" value={mealName} onChange={handleMealName}/>
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
                <div className='form-part ingds-part'>
                    <label htmlFor='meal-ingds'>Meal Ingredients (Sperated by a <b>','</b>)</label>
                    <input name="meal-ingds" type="text" value={ingds} onChange={handleIngds}/>
                </div>
                <div className="form-part submit-part">
                    <button type="submit">Add Meal</button>
                </div>
            </form>
        </main>
        </>
    );
}

export default AddMeal;