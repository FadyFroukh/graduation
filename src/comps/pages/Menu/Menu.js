import React, {useEffect, useState } from 'react';
import "../../../css/Menu.css";
import axios from 'axios';
import MenuSection from '../../MenuSection';
import MenuError from '../../MenuError';
import Container from '../../Container';
import Button from '../Button';
import {useCookies} from 'react-cookie';
import CheckButton from '../../CheckButton';
function Menu(){

    const [mainMeals,setMainMeals] = useState([]);
    const [desserts,setDesserts] = useState([]);
    const [drinks,setDrinks] = useState([]);
    const [sweets,setSweets] = useState([]);
    const [shishas,setShishas] = useState([]);
    const [items,setItems] = useState([]);
    const [error,setError] = useState(false);

    const [cookies,setCookie] = useCookies(["tableID","total"]);

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
        if(cookies.tableID === undefined){
            setCookie("tableID",Math.random(),{path:"/menu",sameSite:"strict"});
        }

        axios.get("http://localhost:3001/items").then(res=>{
            setItems(res.data.filter(table=>table.tableID === Number(cookies.tableID)));
        }).catch(err=>{
            setError(true);
        })

    },[cookies.tableID , cookies.total])

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
                        <CheckButton isStart={false} items={items}/>
                    </Container>
                    <Container>
                        <MenuSection heading="Main Meals" meals={mainMeals} divClass="col-lg-4" isAdmin={false}/>
                        <MenuSection heading="Desserts" meals={desserts} divClass="col-lg-4" isAdmin={false}/>
                        <MenuSection heading="Drinks" meals={drinks} divClass="col-lg-4" isAdmin={false}/>
                        <MenuSection heading="Sweets" meals={sweets} divClass="col-lg-6" isAdmin={false}/>
                        <MenuSection heading="Shishas" meals={shishas} divClass="col-lg-6" isAdmin={false}/>
                    </Container>
                 </>
            }
        </div>
    );
}

export default Menu;