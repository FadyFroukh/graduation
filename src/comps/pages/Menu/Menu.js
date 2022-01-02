import React, {useEffect, useState } from 'react';
import "../../../css/Menu.css";
import axios from 'axios';
import MenuSection from '../../MenuSection';
import MenuError from '../../MenuError';
import Container from '../../Container';
import Button from '../Button';
import Check from '../../Check';
import MealComps from '../../MealComps';
import swal from 'sweetalert';
import CounterMenu from '../../CounterMenu';
export const displaySelect = ()=>{

    let options = [];

    for(let i =1; i< 11; i++){
        options.push(<option value={i} key={i}>{i}</option>);
    }
    return options;
}

function Menu(){
    const [mainMeals,setMainMeals] = useState([]);
    const [desserts,setDesserts] = useState([]);
    const [drinks,setDrinks] = useState([]);
    const [sweets,setSweets] = useState([]);
    const [shishas,setShishas] = useState([]);

    const [mealName,setMealName] = useState("");
    const [mealPrice,setMealPrice] = useState(0);
    const [ingds,setIngds] = useState([]);
    const [addedIngds,setAddedIngds] = useState([]);


    const [error,setError] = useState(false);
    const [click,setClick] = useState(false);
    const [counter,setCounter] = useState(1);
    const [ingdsClick,setIngdsClick] = useState(false);
    const [countClick,setCountClick] = useState(false);

    const [mealId,setMealId] = useState("");

    const handleClick = ()=>{
        setClick(!click);
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

    const getMeal = ()=>{
        axios.get("http://localhost:4000/meals/" + mealId).then(res=>{
            setIngds(res.data.itemIngds);
            setMealName(res.data.itemName);
            setMealPrice(res.data.itemPrice);
        }).catch(()=>{
            console.log("Error Fetching Ingds");
        })
    }

    useEffect(()=>{
        axios.get("http://localhost:4000/meals").then(res=>{
            setMainMeals(res.data.filter(meal=>meal.itemCat==="main"));
            setDesserts(res.data.filter(meal=>meal.itemCat==="desserts"));
            setDrinks(res.data.filter(meal=>meal.itemCat==="drinks"));
            setSweets(res.data.filter(meal=>meal.itemCat==="sweets"));
            setShishas(res.data.filter(meal=>meal.itemCat==="shishas"));

        }).catch(err=>{
            console.log(err);
            setError(true);
        })

    },[])

    return(
        <div className="menu">
            {
                error ?
                 <>
                    <MenuError/>
                 </> 
                :
                 <>
                    <Container>
                        <div className="col-lg-6 header-btn">
                            <Button btnText="Go Back" marginTop="20px" btnWidth="200px" btnLink="/table"/>
                        </div>
                        <div className="check-btn col-lg-6">
                            <button onClick={handleClick}>See Check</button>
                        </div>
                    </Container>
                    <Container>
                        <MenuSection heading="Main Meals" meals={mainMeals} divClass="col-lg-4"
                        ingdsClick={ingdsClick} setIngdsClick={setIngdsClick} setMealId={setMealId}
                         />
                        <MenuSection heading="Appetizers" meals={desserts} divClass="col-lg-4" 
                        setMealId={setMealId} countClick={countClick} setCountClick={setCountClick}
                        />
                        <MenuSection heading="Drinks" meals={drinks} divClass="col-lg-4"
                        setMealId={setMealId} countClick={countClick} setCountClick={setCountClick}
                        />
                        <MenuSection heading="Sweets" meals={sweets} divClass="col-lg-6" 
                        setMealId={setMealId} countClick={countClick} setCountClick={setCountClick}
                        />
                        <MenuSection heading="Shishas" meals={shishas} divClass="col-lg-6" 
                        setMealId={setMealId} countClick={countClick} setCountClick={setCountClick}
                        />
                    </Container>
                    {click ? <Check/> : null}

                    {ingdsClick ? <MealComps ingdsClick={ingdsClick} setIngdsClick={setIngdsClick}
                    displaySelect={displaySelect} setCounter={setCounter}mealName={mealName}
                    orderMeals={orderMeals} ingds={ingds} setIngds={setIngds} addedIngds={addedIngds}
                    setAddedIngds={setAddedIngds} getMeal={getMeal} 
                    /> : null}

                    {countClick ? <CounterMenu countClick={countClick} setCountClick={setCountClick}
                    displaySelect={displaySelect}  orderMeals={orderMeals} getMeal={getMeal} setCounter={setCounter}
                    /> : null}
                 </>
            }
        </div>
    );
}

export default Menu;