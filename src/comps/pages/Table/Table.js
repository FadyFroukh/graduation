import React, { useEffect, useState } from 'react';
import "../../../css/Table.css";
import Container from '../../Container';
import Header from '../../Header';
import Button from '../Button';
import {FaChevronLeft,FaChevronRight} from 'react-icons/fa';
import {IconContext} from 'react-icons/lib'
function Table(){

    const [imgNum,setImgNum] = useState(1);
    const [date,setDate] = useState();
    const [day,setDay] = useState();

    const meals = ["Hamburger","Tortilla","Shawerma"];    


    useEffect(()=>{
        setTimeout(()=>{
            if(imgNum === meals.length){
                setImgNum(1);
            }
            else{
                setImgNum(imgNum+1);
            }

        },5000)

        setDate(new Date().toLocaleDateString())
        setDay(new Date().getUTCDay());

    },[imgNum, meals.length])


    const moveLeft = ()=>{
        if(imgNum <= meals.length && imgNum !== 1){
            setImgNum(imgNum-1);
        }
    }

    const moveRight = ()=>{
        if(imgNum === meals.length){
            setImgNum(1);
        }else {
            setImgNum(imgNum+1);
        }
    }

    function getDay(){
        switch(day){
            case 0 : return "Sunday"
            
            case 1 : return "Monday"

            case 2 : return "Tuesday"
            
            case 3 : return "Wedensday"
            
            case 4 : return "Thursday"

            case 5 : return "Friday"

            case 6 : return "Saturday"
            default:
                return "Not a day"
        }
    }

    return(
        <>
        <IconContext.Provider value={{color:"#fff",size:50}}>
            <main className="table-page-overlay">
                <Header name="ST-Menu"/>
                <Container>
                    <div className="col-lg-12 today-date">
                        <p>Today is {getDay()}</p>
                        <p>The date is {date}</p>
                    </div>
                    <div className="col-lg-12">
                        <h4 className="text-center">Start By Looking at the Desserts !</h4>
                    </div>
                </Container>
                <Container>
                    <div className="col-lg-8">
                        <div className="slider">
                            <img src={`images/slider/${imgNum}.jpg`} alt="Meal"/>
                            <div className="slider-overlay">
                                <div className="left-arrow arrow" onClick={moveLeft}>
                                    <FaChevronLeft/>
                                </div>
                                <p>{meals[imgNum-1]}</p>
                                <div className="right-arrow arrow" onClick={moveRight}>
                                    <FaChevronRight/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 side-menu">
                        <div className="menu-item">
                            <Button btnText="Desserts" btnWidth="100%" btnHeight="90px" btnLink="/menu/desserts"/>
                        </div>
                        <div className="menu-item">
                            <Button btnText="Main Meals" btnWidth="100%" btnHeight="90px" btnLink="/menu/main"/>
                        </div>
                        <div className="menu-item">
                            <Button btnText="Drinks" btnWidth="100%" btnHeight="90px" btnLink="/menu/drinks"/>
                        </div>
                        <div className="menu-item">
                            <Button btnText="Sweets" btnWidth="100%" btnHeight="90px" btnLink="/menu/sweets"/>
                        </div>
                        <div className="menu-item">
                            <Button btnText="Shishas" btnWidth="100%" btnHeight="90px" btnLink="/menu/shisha"/>
                        </div>
                    </div>
                    <div className="col-lg-8 order-btn">
                        <Button btnText="Order Meals" btnWidth="250px" btnHeight="80px" btnLink="/menu"/>
                    </div>
                </Container>
            </main>
            </IconContext.Provider>
        </>
    );
}

export default Table;