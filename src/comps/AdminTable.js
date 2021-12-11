import React from 'react';

function AdminTable({user}){

    return(
        <>
          <div className="admin-table">
                <div className="orders-body">
                    <header className="orders-header text-center">{user.name}</header>
                    <div className="orders">
                    
                    </div>
                </div>
          </div>  
        </>
    );
}

export default AdminTable;