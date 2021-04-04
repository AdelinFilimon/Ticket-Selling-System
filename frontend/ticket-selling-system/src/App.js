import './App.css';
import React from 'react';
import { Route, HashRouter, Switch} from 'react-router-dom';

import Navbar from './components/navbar/navbar';
import Homepage from './components/home/home';
import Login from './components/login/login';
import AdministratorPage from './components/administrator/administrator';
import CashierPage from './components/cashier/cashier';
import PrivateRoute from './authentication/privateroute'

function App() {
  return (
    <HashRouter>
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/" component = {Homepage}/>
        <Route path="/login" component={Login}/>
        <PrivateRoute path="/administrator" component={AdministratorPage} role="administrator"/>
        <PrivateRoute path="/cashier" component={CashierPage} role="cashier"/>
      </Switch>
    </HashRouter>
  )
}

export default App;
