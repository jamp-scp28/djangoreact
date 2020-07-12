import React, { Component } from 'react'
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from "react-router-dom";
import List from './pages/List'
import Login from './pages/Login'
import Home from './pages/Home'
import Locations from './pages/Locations'
import Dashboard from './pages/Dashboard'
import Index from "./views/Index"
import Login1 from "./views/examples/Login"
//import Test from './pages/Test';
import PrivRoute from './PrivRoute'
import Navi from './layouts/Admin'
import PrivateRoute from "./components/common/PrivateRoute";
import AdminLayout from "./layouts/Admin.js";

const hist = createBrowserHistory();

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       authenticated: false
    }
  }
  
  render() {
    return (
      <Router history={hist}>
        <Switch>
           <Route exact path="/login" component={Login} />
           <Route exact path="/" component={Home} />
           <PrivRoute exact path="/dashboard/ind" component={Dashboard} />
           <PrivRoute exact path="/list" component={List} />
           <PrivRoute exact path="/locations" component={Locations} />
           <PrivRoute exact path="/" component={Navi} />
           <PrivRoute exact path="/user" component={Navi} />
           <Route path="/" render={props => <AdminLayout {...props} />} />           
        </Switch>
    </Router>
      
    )
  }
}