import React, { Component} from 'react';
import './App.css';


import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Cookie from 'js-cookie'

import 'bootstrap/dist/css/bootstrap.min.css'
import Admin from './layouts/admin';
import Medecin from './layouts/medecin';
import Patient from './layouts/patient';
import Public from './layouts/public';
import Page404 from './component/pageNotFound';


class App extends Component {
  constructor(props){
    super(props)
    this.state={
      user:{},

    }
  }
  patientauthentified = (d)=>{
    if (this.state.user.id !== d.id){
      // localStorage.setItem('patient', d);
      Cookie.set("userAuth", d, { expires: 1 });
      this.setState({ user: d })
    }
    
  }
  medecinAuthentified=(d)=>{
    if (this.state.user.id !== d.id) {
      // Cookie.set("token", d.token, { expires: 1 });
      Cookie.set("userAuth", d, { expires: 1 });
      // localStorage.setItem('medecin', d);
      this.setState({ user: d })
    }
  }
  adminAuthentified = (d) => {
    if (this.state.user.id !== d.id) {
      // localStorage.setItem('admin', d);
      Cookie.set("userAuth", d, { expires: 1 });
      this.setState({ user: d })
    }
  }
  render(){
     return (
    <div className="App">
      <BrowserRouter >
        <Switch>
             <Route path="/admin" render={props => <Admin userData={this.state.user} {...props} />} />
             <Route path="/medecin" render={props => <Medecin userData={this.state.user} {...props} />} />
          <Route path="/patient" render={props => <Patient userData={this.state.user} {...props} />} />
             <Route path="/public" render={props => <Public patientauthentified={this.patientauthentified} medecinAuthentified={this.medecinAuthentified} adminAuthentified={this.adminAuthentified} {...props} />} />
          {/* <Route exact path="/**" component={Page404} /> */}

          <Redirect from="/" to="/public" />

        </Switch>
      </BrowserRouter>
    </div>
  )
  }
 
}

export default App;
