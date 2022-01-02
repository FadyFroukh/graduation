import React , {useState , useEffect} from 'react';
import Container from '../../Container';
import axios from "axios";
import "../../../css/Home.css";
import swal from 'sweetalert';

function Home(){

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [isLogged,setIsLogged] = useState(false);
    const [isLoading,setIsLoading] = useState(false);


    const handleUsername = (e)=>{
        setUsername(e.target.value);
    }

    const handlePassword = (e)=>{
        setPassword(e.target.value);
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(username.trim() === "" || password.trim() === ""){
            swal({title:"Empty Fields",text:"Check All Options , No Empty Fields",icon:"error"});
        }else {
            setIsLoading(!isLoading);
            axios.post("http://localhost:4000/login",{name:username,password}).then(res=>{
                if(res.data.length > 0 ){
                    setIsLogged(true);
                    localStorage.setItem("user",JSON.stringify(res.data[0]));
                    localStorage.setItem("isLogin",true);
                    setIsLoading(false);
                }else {
                    setUsername("");
                    setPassword("");
                    swal({title:"Incorrect Credentials Given",text:`Username or Password Incorrect , Check Again`,icon:"error"});
                    setIsLoading(false);
                }
            }).catch(err=>{
                setUsername("");
                setPassword("");
                swal({title:"Something went wrong..",text:"An error occured while trying to connect to to the system",icon:"error"});
            })    
        }
    }

    useEffect(()=>{
        var isLogin = localStorage.getItem("isLogin");
        if(isLogin){
         setIsLogged(true);
         switch(JSON.parse(localStorage.getItem("user")).rule){
             case 0: window.location.href = "/table"
             break;
             case 1 : window.location.href = "/waiter"
             break;
             case 2 :window.location.href = "/admin"
             break;
         }
        }else {
         setIsLogged(false);
        }
     })

    return(
        <>
         {
             isLoading ? <div className='loading'>
                            <h1>Trying to Log You In...</h1>
                            <p>Checking Your Credentials</p>
                        </div>
                    : null    
         }
          <main className="admin-page-overlay">
            <Container>
                <div className="col-lg-12 form-div">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h3>Login to Smart Menu</h3>
                        <div className="form-part">
                            <label>Enter Username</label>
                            <input type="text" value={username} onChange={handleUsername} maxLength="20"/>
                        </div>
                        <div className="form-part">
                            <label>Enter Password</label>
                            <input type="password" value={password} onChange={handlePassword} maxLength="30"/>
                        </div>
                        <div className="form-part btn-cont">
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </Container>
          </main>
        </>
    )
}
export default Home;