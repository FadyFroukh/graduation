import swal from "sweetalert";
import axios from "axios";

export function displaySelect(){

    let options = [];

    for(let i =1; i< 11; i++){
        options.push(<option value={i} key={i}>{i}</option>);
    }
    return options;
}

export function fetchTables(setUsers){
    axios.get("http://localhost:4000/tables").then(res=>{
             setUsers(res.data);
         }).catch(err=>{
             console.log("An error occured");
         })
}

export function handleLogout (){
    localStorage.removeItem("user");
    localStorage.removeItem("isLogin");
    window.location.href = "/";        
}

export function orderMeals(order){
    for(let i =0; i<order.counter; i++){
        axios.post("http://localhost:4000/orders",{
            itemName:order.mealName,
            itemPrice:order.mealPrice,
            addedAt:new Date(),
            table:order.id,
            ingds:order.addedIngds
        }).then(res=>{

        }).catch(err=>{
            swal({title:"Something went wrong",text:"Contact the staff please",icon:"error"});
        });
    }
    if(order.counter > 1){
        swal({title:"Meals Added Successfully",text:`Added ${order.counter} ${order.mealName} to the check`,icon:"success"});
    }else {
        swal({title:"Meal Added Successfully",text:`Added ${order.mealName} to the check`,icon:"success"});
    }
    order.setCounter(1);
}

export function getMeal(obj){
    axios.get("http://localhost:4000/meals/" + obj.mealId).then(res=>{
        obj.setIngds(res.data.itemIngds);
        obj.setMealName(res.data.itemName);
        obj.setMealPrice(res.data.itemPrice);
    }).catch(()=>{
        console.log("Error Fetching Ingds");
    })
}

export function fetchMeals(obj){
    axios.get("http://localhost:4000/meals").then(res=>{
        obj.setMainMeals(res.data.filter(meal=>meal.itemCat==="main"));
        obj.setDesserts(res.data.filter(meal=>meal.itemCat==="desserts"));
        obj.setDrinks(res.data.filter(meal=>meal.itemCat==="drinks"));
        obj.setSweets(res.data.filter(meal=>meal.itemCat==="sweets"));
        obj.setShishas(res.data.filter(meal=>meal.itemCat==="shishas"));

    }).catch(err=>{
        console.log(err);
        obj.setError(true);
    })
}