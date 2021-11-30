import './App.css';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';
import Home from './comps/pages/Home/Home';
import { useEffect } from 'react';
import Table from './comps/pages/Table/Table';
import Menu from './comps/pages/Menu/Menu';
import MenuMeal from './comps/MenuMeal';
import Admin from './comps/pages/Admin/Admin'
import Operation from './comps/Operation';
import Waiter from './comps/pages/Waiter/Waiter';
import WaiterTable from './comps/WaiterTable';
function App() {

  useEffect(()=>{
    
  },[])

  return (
    <div className="App">
      <Router>
        <Switch> 
          <Route path="/" exact component={Home}/>
          <Route path="/table" component={Table}/>
          <Route path="/waiter" exact component={Waiter}/>
          <Route path="/waiter/:id" component={WaiterTable}/>
          <Route path="/admin" exact component={Admin}/>
          <Route path="/admin/:id" component={Operation}/>
          <Route path="/menu" exact component={Menu}/>
          <Route path="/menu/:id" component={MenuMeal}/>
         </Switch>
      </Router>
    </div>
  );
}

export default App;
