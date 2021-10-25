import React from 'react';
import Container from '../../Container';
import Button from '../Button';
import "../../../css/Home.css";
function Home(){
    return(
        <>
          <main className="main-page-overlay">
            <Container>
                <div className="col-lg-6">
                    <Button btnText="Admin" btnLink="/admin" btnWidth="50%" btnHeight="200px" isCenter={true}/>
                </div>
                <div className="col-lg-6">
                    <Button btnText="Table" btnLink="/table" btnWidth="50%" btnHeight="200px" isCenter={true}/>
                </div>
            </Container>
          </main>
        </>
    )
}
export default Home;