import React , {useState,useEffect } from 'react';
import Container from './Container';
import axios from 'axios';
import MenuError from './MenuError';
import "../css/MenuError.css";
import Button from './pages/Button';
import MealComps from './MealComps';
import MenuSection from './MenuSection';
import {displaySelect} from './pages/Menu/Menu';
import swal from 'sweetalert';
import CounterMenu from './CounterMenu';

function MenuMeal({match}){
    let id = match.params.id;

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

    const getMeal = ()=>{
        axios.get("http://localhost:4000/meals/" + mealId).then(res=>{
            setIngds(res.data.itemIngds);
            setMealName(res.data.itemName);
            setMealPrice(res.data.itemPrice);
        }).catch(()=>{
            console.log("Error Fetching Ingds");
        })
    }

    const orderMeals = ()=>{
        for(let i =0; i<counter; i++){
            axios.post("http://localhost:4000/orders",{
                itemName:mealName,
                itemPrice:mealPrice,
                addedAt:new Date(),
                table:JSON.parse(localStorage.getItem("user"))._id,
                ingds:addedIngds
            }).then(res=>{

            }).catch(err=>{
                swal({title:"Something went wrong",text:"Contact the staff please",icon:"error"});
            });
        }
        if(counter > 1){
            swal({title:"Meals Added Successfully",text:`Added ${counter} ${mealName} to the check`,icon:"success"});
        }else {
            swal({title:"Meal Added Successfully",text:`Added ${mealName} to the check`,icon:"success"});
        }
        setCounter(1);
    }


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
                    orderMeals={orderMeals} ingds={ingds} setIngds={setIngds} addedIngds={addedIngds}
                    setAddedIngds={setAddedIngds} getMeal={getMeal} 
                    /> : null}

                {countClick ? <CounterMenu countClick={countClick} setCountClick={setCountClick}
                    displaySelect={displaySelect}  orderMeals={orderMeals} getMeal={getMeal} setCounter={setCounter}
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