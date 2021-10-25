import './App.css';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';
import Home from './comps/pages/Home/Home';
import { useEffect } from 'react';
import Table from './comps/pages/Table/Table';
import Menu from './comps/pages/Menu/Menu';
import MenuMeal from './comps/MenuMeal';
import Admin from './comps/pages/Admin/Admin';
function App() {

  useEffect(()=>{
    
  },[])

  return (
    <div className="App">
      <Router>
        <Switch> 
          <Route path="/" exact component={Home}/>
          <Route path="/admin" component={Admin}/>
          <Route path="/table" component={Table}/>
          <Route path="/menu" exact component={Menu}/>
          <Route path="/menu/:id" component={MenuMeal}/>
         </Switch>
      </Router>
    </div>
  );
}

export default App;
