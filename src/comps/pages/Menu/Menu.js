import React, {useEffect, useState } from 'react';
import "../../../css/Menu.css";
import axios from 'axios';
import MenuSection from '../../MenuSection';
import MenuError from '../../MenuError';
import Container from '../../Container';
import Button from '../Button';
import Check from '../../Check';

function Menu(){
    const [mainMeals,setMainMeals] = useState([]);
    const [desserts,setDesserts] = useState([]);
    const [drinks,setDrinks] = useState([]);
    const [sweets,setSweets] = useState([]);
    const [shishas,setShishas] = useState([]);

    const [error,setError] = useState(false);
    const [click,setClick] = useState(false);

    const handleClick = ()=>{
        setClick(!click);
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
                        <MenuSection heading="Main Meals" meals={mainMeals} divClass="col-lg-4" isAdmin={false}/>
                        <MenuSection heading="Desserts" meals={desserts} divClass="col-lg-4" isAdmin={false}/>
                        <MenuSection heading="Drinks" meals={drinks} divClass="col-lg-4" isAdmin={false}/>
                        <MenuSection heading="Sweets" meals={sweets} divClass="col-lg-6" isAdmin={false}/>
                        <MenuSection heading="Shishas" meals={shishas} divClass="col-lg-6" isAdmin={false}/>
                    </Container>
                    {click ? <Check/> : null}
                 </>
            }
        </div>
    );
}

export default Menu;