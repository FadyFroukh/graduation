import React, {useEffect, useState } from 'react';
import "../../../css/Menu.css";
import MenuSection from '../../MenuSection';
import MenuError from '../../MenuError';
import Container from '../../Container';
import Button from '../Button';
import Check from '../../Check';
import MealComps from '../../MealComps';
import CounterMenu from '../../CounterMenu';
import { orderMeals,displaySelect,getMeal,fetchMeals } from '../Utils';
import ReadyOverlay from '../../ReadyOverlay';

function Menu(){

    const [id] = useState(JSON.parse(localStorage.getItem("user"))._id);

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


    const [minutes,setMinutes] = useState(20);
    const [overlayClick,setOverlayClick] = useState(false);
    const [status,setStatus] = useState(false);


    const handleClick = ()=>{
        setClick(!click);
    }

    useEffect(()=>{
        fetchMeals({setMainMeals,setDesserts,setDrinks,setSweets,setShishas,setError});
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
                        <MenuSection heading="Main Meals" meals={mainMeals} divClass="col-lg-10"
                        ingdsClick={ingdsClick} setIngdsClick={setIngdsClick} setMealId={setMealId}
                         />
                        <MenuSection heading="Appetizers" meals={desserts} divClass="col-lg-10" 
                        setMealId={setMealId} countClick={countClick} setCountClick={setCountClick}
                        />
                        <MenuSection heading="Drinks" meals={drinks} divClass="col-lg-10"
                        setMealId={setMealId} countClick={countClick} setCountClick={setCountClick}
                        />
                        <MenuSection heading="Sweets" meals={sweets} divClass="col-lg-10" 
                        setMealId={setMealId} countClick={countClick} setCountClick={setCountClick}
                        />
                        <MenuSection heading="Shishas" meals={shishas} divClass="col-lg-10" 
                        setMealId={setMealId} countClick={countClick} setCountClick={setCountClick}
                        />
                    </Container>
                    {click ? <Check overlayClick={overlayClick} setOverlayClick={setOverlayClick} 
                        status={status} setStatus={setStatus} id={id}
                    /> : null}

                    {ingdsClick ? <MealComps ingdsClick={ingdsClick} setIngdsClick={setIngdsClick}
                    displaySelect={displaySelect} setCounter={setCounter}mealName={mealName}
                    orderMeals={()=>orderMeals({
                        counter,
                        mealName,
                        mealPrice,
                        addedIngds,
                        setCounter,
                        id
                    })} ingds={ingds} setIngds={setIngds} addedIngds={addedIngds}
                    setAddedIngds={setAddedIngds} getMeal={()=>getMeal({mealId,setIngds,setMealName,setMealPrice})}
                    /> : null}

                    {countClick ? <CounterMenu countClick={countClick} setCountClick={setCountClick}
                    displaySelect={displaySelect}  orderMeals={()=>orderMeals({
                        counter,
                        mealName,
                        mealPrice,
                        addedIngds,
                        setCounter,
                        id
                    })} getMeal={()=>getMeal({mealId,setIngds,setMealName,setMealPrice})} setCounter={setCounter} mealName={mealName}
                    /> : null}

                    {overlayClick ? <ReadyOverlay overlayClick={overlayClick} setOverlayClick={setOverlayClick}
                        status={status} setStatus={setStatus} id={id} minutes={minutes} setMinutes={setMinutes}
                    /> : null}
                 </>
            }
        </div>
    );
}

export default Menu;
