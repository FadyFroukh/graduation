import React , {useState,useEffect} from 'react';
import axios from 'axios';
import Button from './pages/Button';
import Order from './Order';
function WaiterTable({match}){

    const [user,setUser] = useState({});
    const [total,setTotal] = useState(0);

    useEffect(()=>{
        axios.get(`http://localhost:4000/tables/${match.params.id}`).then(res=>{
            setUser(res.data);
        }).catch(err=>{ 
            console.log(err);
        })
    },[user])


    return(
        <>
            <div className="table-orders-overlay">
                <Button btnText="Go Back" btnLink="/waiter" btnWidth="180px"/>
                <h2>{user.name}</h2>
               <div className="table-orders">
               {
                   user?.orders?.map((order,index)=>
                        <>
                           <Order order={order} key={index} tableName={user.name}/>
                        </>
                    )
               }
               </div>
               <div className="total">
                    <p>Total</p>
                    <p>{total}</p>
               </div>
            </div>
        </>
    );
}

export default WaiterTable;