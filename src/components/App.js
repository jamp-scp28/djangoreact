import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import "../assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../assets/scss/argon-dashboard-react.scss";

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import Navi from '../layouts/Admin'

import Alerts from './layout/Alerts';
import Login from './accounts/Login';
import Register from './accounts/Register';
import PrivateRoute from './common/PrivateRoute';



import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/auth';

import AdminLayout from "../layouts/Admin.js";
import Index from "../views/Index"

import routes from "../routes.js";
import Sidebar from "../components/Sidebar/Sidebar.js";

// import Dashboards from './todos/Dashboard';
import TodoDelete from './todos/TodoDelete';
import TodoEdit from './todos/TodoEdit';
// Alert Options
const alertOptions = {
  timeout: 3000,
  position: 'top center',
};


class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Alerts />
              <div className="">

                <Switch>
                  {/* <PrivateRoute exact path="/admin/index" component={Index} /> */}
                  <Route path="/admin" render={props => <AdminLayout {...props} />} />
                  {/* <PrivateRoute exact path='/delete/:id' component={TodoDelete} />
                  <PrivateRoute exact path='/edit/:id' component={TodoEdit} /> */}

                  <PrivateRoute exact path="/" component={Navi} />
                
                  
                  {/* <PrivateRoute exact path="/emp" component={EmpDashboard} /> */}
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />

                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
