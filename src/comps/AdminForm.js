import React , {useState} from 'react';
import { useCookies } from 'react-cookie';
import Container from "./Container";
import Button from './pages/Button';

function AdminForm({admins,setIsLogged,isLogged}){

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [loginError,setLoginError] = useState("");

    const [cookies,setCookie] = useCookies(["username","password"]);

    const handleUsername = (e)=>{
        setUsername(e.target.value);
    }

    const handlePassword = (e)=>{
        setPassword(e.target.value);
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(admins.filter(admin=> admin.name === username && admin.password === password).length === 1){
            setCookie("username",username,{path:"/admin",sameSite:"strict"});
            setCookie("password",password,{path:"/admin",sameSite:"strict"});
            setIsLogged(!isLogged);
        }else {
            setLoginError("Admin Not Registered...");
        }
    }

    return(
    <main className="admin-page-overlay">
        <Container>
            <Button btnText="Go Back" btnLink="/" btnWidth="150px" btnHeight="70px" isCenter={false}/>
            <div className="col-lg-12 form-div">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h3>Login as Admin</h3>
                    {
                        loginError === "" ? null : <div className="alert alert-danger">{loginError}</div>
                    }
                    <div className="form-part">
                        <label>Admin Username</label>
                        <input type="text" value={username} onChange={handleUsername} maxLength="20"/>
                    </div>
                    <div className="form-part">
                        <label>Admin Password</label>
                        <input type="password" value={password} onChange={handlePassword} maxLength="30"/>
                    </div>
                    <div className="form-part btn-cont">
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </Container>
    </main>
    );
}

export default AdminForm;