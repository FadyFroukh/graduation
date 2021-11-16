import React from 'react';
import Container from './Container';

function AdminDatabase(){
    return(
    <Container>
        <div className="admin-error">
            <h2>Something went wrong while trying to fetch data..</h2>
            <p>Try checking internet connection..</p>
            <p>Refreshing the page might help..</p>
        </div>
    </Container>
    );
}

export default AdminDatabase;