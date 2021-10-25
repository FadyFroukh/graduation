import React , {useState,useEffect } from 'react';
import Container from './Container';
import MenuSection from './MenuSection';
import axios from 'axios';
import MenuError from './MenuError';
import "../css/MenuError.css";
import Button from './pages/Button';
import CheckButton from './CheckButton';

function MenuMeal({match}){
    let id = match.params.id;

    const [mainMeals,setMainMeals] = useState([]);
    const [desserts,setDesserts] = useState([]);
    const [drinks,setDrinks] = useState([]);
    const [sweets,setSweets] = useState([]);
    const [shishas,setShishas] = useState([]);
    const [error,setError] = useState(false);


    useEffect(()=>{
        axios.get("http://localhost:3001/menu").then(res=>{

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

    const cont = (meals)=>{
        return(
            <div>
            <Container>
                <CheckButton isStart={true}/>
            </Container>
            <Container isCenter={true}>
                <Button btnText="Go Back" marginTop="20px" btnWidth="200px" btnLink="/table"/>
                <MenuSection heading={id.replace(/^\w/, (c) => c.toUpperCase())} meals={meals} divClass="col-lg-6" isAdmin={false}/>
            </Container>
            </div>
        )
    }

    if (error){
        return(
            <MenuError/>
        );
    } else {
        if(id === "desserts"){
            return(
                <>
                    {cont(desserts)}
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