import React , {useState,useEffect } from 'react';
import Container from './Container';
import axios from 'axios';
import MenuError from './MenuError';
import "../css/MenuError.css";
import Button from './pages/Button';
import SoloSection from './SoloSection';
import MealComps from './MealComps';

function MenuMeal({match}){
    let id = match.params.id;

    const [mainMeals,setMainMeals] = useState([]);
    const [appetizers,setAppetizers] = useState([]);
    const [drinks,setDrinks] = useState([]);
    const [sweets,setSweets] = useState([]);
    const [shishas,setShishas] = useState([]);
    const [error,setError] = useState(false);
    
    const [mealId,setMealId] = useState("");
    const [ingdsClick,setIngdsClick] = useState(false);

    useEffect(()=>{
        axios.get("http://localhost:4000/meals").then(res=>{

            setMainMeals(res.data.filter(meal=>meal.itemCat==="main"));
            setAppetizers(res.data.filter(meal=>meal.itemCat==="desserts"));
            setDrinks(res.data.filter(meal=>meal.itemCat==="drinks"));
            setSweets(res.data.filter(meal=>meal.itemCat==="sweets"));
            setShishas(res.data.filter(meal=>meal.itemCat==="shishas"));

        }).catch(err=>{
            console.log(err);
            setError(true);
        })
        
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
                        id === "main" ? <SoloSection heading={id.replace(/^\w/, (c) => c.toUpperCase())} meals={meals} divClass="col-lg-6"
                        setMealId={setMealId} ingdsClick={ingdsClick} setIngdsClick={setIngdsClick}
                    /> : 
                        <SoloSection heading={id.replace(/^\w/, (c) => c.toUpperCase())} meals={meals} divClass="col-lg-6"
                        setMealId={setMealId}
                        />
                    }
                </Container>
                {ingdsClick ? <MealComps ingdsClick={ingdsClick} setIngdsClick={setIngdsClick} mealId={mealId}/> : null}
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