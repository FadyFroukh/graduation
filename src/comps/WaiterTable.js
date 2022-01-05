import React , {useState,useEffect} from 'react';
import axios from 'axios';
import Button from './pages/Button';
import Order from './Order';
import MealComps from './MealComps';
import CounterMenu from './CounterMenu';
import TableIcons from './TableIcons';
import {getMeal,orderMeals,displaySelect} from "./pages/Utils";
function WaiterTable({match}){

    const id = match.params.id;

    const [user,setUser] = useState({});
    const [total,setTotal] = useState(0);
    const [meals,setMeals] = useState([]);

    const [mealName,setMealName] = useState("");
    const [mealPrice,setMealPrice] = useState(0);
    const [ingds,setIngds] = useState([]);
    const [counter,setCounter] = useState(1);
    const [addedIngds,setAddedIngds] = useState([]);
    const [countClick,setCountClick] = useState(false);

    
    const [mealId,setMealId] = useState("");
    const [ingdsClick,setIngdsClick] = useState(false);


    useEffect(()=>{
        axios.get(`http://localhost:4000/tables/${id}`).then(res=>{
            setUser(res.data);
        }).catch(err=>{ 
            console.log(err);
        })
    },[user]);

    useEffect(()=>{
        axios.get(`http://localhost:4000/meals`).then(res=>{
            setMeals(res.data)
        }).catch(err=>{ 
            console.log(err);
        })
    },[id])

    return(
        <>
            <div className="table-orders-overlay">
                <Button btnText="Go Back" btnLink="/waiter" btnWidth="180px"/>
                <h2>{user.name}</h2>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <h3 className='text-center'>Orders</h3>
                        <div className="table-orders col-lg-10">
                            {
                                user?.orders?.length > 0 ? user?.orders?.map((order,index)=>
                                <div key={index} className='o'>
                                <Order order={order} key={index} tableName={user.name} total={total} setTotal={setTotal} name={user.anm}/>
                                </div>
                                ) : <div className='no-orders'><h1>No Orders Yet</h1></div>
                            }
                        </div>
                        <div className="total">
                            <p>Total</p>
                            <p>{total}</p>
                        </div>
                        <h3 className='text-center'>Add an Order</h3>
                        <div className='col-lg-10 meals-orders'>
                            
                            {
                                meals?.map((meal,index)=>
                                    <div className='meal' key={index}>
                                        <p className='meal-name'>{meal.itemName}</p>
                                        <p className='meal-price'>{meal.itemPrice}</p>
                                        <div>
                                        <TableIcons meal={meal} ingdsClick={ingdsClick} setIngdsClick={setIngdsClick} setMealId={setMealId}
                                        countClick={countClick} setCountClick={setCountClick}
                                        />
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            {
            ingdsClick ? <MealComps ingdsClick={ingdsClick} setIngdsClick={setIngdsClick}
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

            {countClick ? <CounterMenu countClick={countClick} setCountClick={setCountClick} mealName={mealName}
            displaySelect={displaySelect}   orderMeals={()=>orderMeals({
                counter,
                mealName,
                mealPrice,
                addedIngds,
                setCounter,
                id
            })} getMeal={()=>getMeal({mealId,setIngds,setMealName,setMealPrice})} 
            setCounter={setCounter}
            /> : null}

        </>
    );
}

export default WaiterTable;

