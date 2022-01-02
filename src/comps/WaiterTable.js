import React , {useState,useEffect} from 'react';
import axios from 'axios';
import Button from './pages/Button';
import Order from './Order';
import { FaPlusCircle } from 'react-icons/fa';
import MealComps from './MealComps';
import CounterMenu from './CounterMenu';
import {displaySelect} from './pages/Menu/Menu';
import swal from 'sweetalert';
import TableIcons from './TableIcons';

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
                table:id,
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

    return(
        <>
            <div className="table-orders-overlay">
                <Button btnText="Go Back" btnLink="/waiter" btnWidth="180px"/>
                <h2>{user.name}</h2>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className="table-orders col-lg-4">
                            <h3 className='text-center'>Orders</h3>
                            {
                                
                                    user?.orders?.map((order,index)=>
                                    <div key={index} className='o'>
                                    <Order order={order} key={index} tableName={user.name} total={total} setTotal={setTotal} name={user.anm}/>
                                    </div>
                                    )
                            }
                            <div className="total">
                            <p>Total</p>
                            <p>{total}</p>
                            </div>
                        </div>
                        <div className='col-lg-4 meals-orders'>
                            <h3 className='text-center'>Add an Order</h3>
                            {
                                meals?.map((meal,index)=>
                                    <div className='meal' key={index}>
                                        <p>{meal.itemName}</p>
                                        <p>{meal.itemPrice}</p>
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
                orderMeals={orderMeals} ingds={ingds} setIngds={setIngds} addedIngds={addedIngds}
                setAddedIngds={setAddedIngds} getMeal={getMeal} 
            /> : null}

            {countClick ? <CounterMenu countClick={countClick} setCountClick={setCountClick}
            displaySelect={displaySelect}  orderMeals={orderMeals} getMeal={getMeal} setCounter={setCounter}
            /> : null}

        </>
    );
}

export default WaiterTable;

