import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import './App.css';



import Login from './Components/Login'
import SignUp from './Components/SignUp'
import Restaurants from './Components/Restaurants'

class App extends Component {
  // <Route component={NotFound} />
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/restaurants" component={Restaurants} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={SignUp} />
        </Switch>
      </Fragment>
    );
  }
}

export default withRouter(App);
