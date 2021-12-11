import React from 'react';
import User from './User';
import Button from './pages/Button';

function EditUser({users}){

    return(
        <>
            <main className="edit-user-overlay">
                <Button btnLink="/admin" btnText="Go Back" btnWidth="150px"/>
                <h2>Edit or Remove a user from the database</h2>
                <div className="edit-users">
                    {
                        users.map((user,index)=>
                            <>
                                <User user={user}/>
                            </>
                        )
                    }
                </div>
            </main>
        </>
    );
}

export default EditUser;