import React , {useState,useEffect} from 'react';
import User from './User';
import Button from './pages/Button';
import EditUserMenu from './EditUserMenu';

function EditUser({users}){

    const [showMenu,setShowMenu] = useState(false);
    const [id,setId] = useState("");
    const [oldUser,setOldUser] = useState({});
    return(
        <>
            <main className="edit-user-overlay">
                <Button btnLink="/admin" btnText="Go Back" btnWidth="150px"/>
                <h2>Edit or Remove a user from the database</h2>
                <div className="edit-users">
                    {
                        users.map((user,index)=>
                            <div key={index}>
                                <User user={user} setOldUser={setOldUser} showMenu={showMenu} setShowMenu={setShowMenu} setId={setId}/>
                            </div>
                        )
                    }
                </div>
                {
                    showMenu ? <EditUserMenu oldUser={oldUser} showMenu={showMenu} setShowMenu={setShowMenu} id={id}/> : null
                }
            </main>
        </>
    );
}

export default EditUser;