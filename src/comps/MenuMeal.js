import React , {useState,useEffect } from 'react';
import Container from './Container';
import MenuError from './MenuError';
import "../css/MenuError.css";
import Button from './pages/Button';
import MealComps from './MealComps';
import MenuSection from './MenuSection';
import { displaySelect,orderMeals,getMeal,fetchMeals } from './pages/Utils';
import CounterMenu from './CounterMenu';

function MenuMeal({match}){
    let id = match.params.id;

    const [table] = useState(JSON.parse(localStorage.getItem("user"))._id);

    const [mainMeals,setMainMeals] = useState([]);
    const [appetizers,setAppetizers] = useState([]);
    const [drinks,setDrinks] = useState([]);
    const [sweets,setSweets] = useState([]);
    const [shishas,setShishas] = useState([]);
    const [error,setError] = useState(false);

    const [mealName,setMealName] = useState("");
    const [mealPrice,setMealPrice] = useState(0);
    const [ingds,setIngds] = useState([]);
    const [counter,setCounter] = useState(1);
    const [addedIngds,setAddedIngds] = useState([]);
    const [countClick,setCountClick] = useState(false);

    
    const [mealId,setMealId] = useState("");
    const [ingdsClick,setIngdsClick] = useState(false);

    useEffect(()=>{
        fetchMeals({setMainMeals,setDesserts:setAppetizers,setDrinks,setSweets,setShishas,setError});
    },[])

    const cont = (meals)=>{
        return(
            <div>
                <Container>
                    <div className="col-lg-6">
                        <Button btnText="Go Back" marginTop="20px" btnWidth="200px" btnLink="/table"/>
                    </div>              
                </Container>
                <Container isCenter={true}>
                    {
                        id === "main" ? <MenuSection heading={id.replace(/^\w/, (c) => c.toUpperCase())} meals={meals} divClass="col-lg-6"
                        setMealId={setMealId} ingdsClick={ingdsClick} setIngdsClick={setIngdsClick}
                    /> : 
                        <MenuSection heading={id.replace(/^\w/, (c) => c.toUpperCase())} meals={meals} divClass="col-lg-6"
                        setMealId={setMealId} setCountClick={setCountClick} countClick={countClick}
                        />
                    }
                </Container>
                {ingdsClick ? <MealComps ingdsClick={ingdsClick} setIngdsClick={setIngdsClick}
                    displaySelect={displaySelect} setCounter={setCounter}mealName={mealName}
                    orderMeals={()=>orderMeals({
                        counter,
                        mealName,
                        mealPrice,
                        addedIngds,
                        setCounter,
                        id:table
                    })}  ingds={ingds} setIngds={setIngds} addedIngds={addedIngds}
                    setAddedIngds={setAddedIngds} getMeal={()=>getMeal({mealId,setIngds,setMealName,setMealPrice})}
                    /> : null}

                {countClick ? <CounterMenu countClick={countClick} setCountClick={setCountClick}
                    displaySelect={displaySelect}   orderMeals={()=>orderMeals({
                        counter,
                        mealName,
                        mealPrice,
                        addedIngds,
                        setCounter,
                        id:table
                    })}  getMeal={()=>getMeal({mealId,setIngds,setMealName,setMealPrice})} 
                    setCounter={setCounter}
                    /> : null}
            </div>
        )
    }

    if (error){
        return(
            <MenuError/>
        );
    } else {
        if(id === "appetizers"){
            return(
                <>
                    {cont(appetizers)}
                </>
            );
        } else if (id === "main"){
            return(
                <>
                    {cont(mainMeals)}
                </>
            );
        } else if (id === "drinks"){
            return(
                <>
                    {cont(drinks)}
                </>
            )
        }else if (id === "sweets"){
            return(
                <>
                    {cont(sweets)}
                </>
            )
        }else {
            return(
                <>
                    {cont(shishas)}
                </>
            )
        }
    }
    
}

export default MenuMeal;