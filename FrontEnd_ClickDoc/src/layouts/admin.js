import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import ListMedecin from '../views/admin/listMedecin';
import ListSpicialite from '../views/admin/listSpicialite';
import ListPatient from '../views/admin/listePatient';


import Admin from '../component/admin/admin'
import Sidebar from '../component/admin/sidebar'
import routes from '../component/admin/routes'
import Cookie from 'js-cookie'

export default class admin extends Component {
 
    constructor(props) {
        super(props)
        this.state = {
            user_info: null,
            isAuth: true
        }
    }
    componentDidMount() {
        if (Cookie.get('userAuth') ){
            let admin = Cookie.getJSON('userAuth')
            this.setState({ user_info: admin, isAuth: true })
        }else{
            this.setState({isAuth: false})
        }
    }
    render() {
        if(!this.state.isAuth){
            return <Redirect to="/public" />
        }
        if (this.state.user_info == null) {
            return null
        }
        return (
            <div>
                <Sidebar routes={routes} donneUser={this.state.user_info} />
                <section className='main-site'>
                    <Switch>
                        <Route exact path="/admin" render={(props) => <Admin donneUser={this.state.user_info} {...props} />} />
                        <Route exact path="/admin/medecins" render={(props) => <ListMedecin donneUser={this.state.user_info} {...props} />} />
                        <Route exact path="/admin/specialite" render={(props) => <ListSpicialite donneUser={this.state.user_info} {...props} />} />
                        <Route exact path="/admin/patient" render={(props) => <ListPatient donneUser={this.state.user_info} {...props} />} />
                    </Switch>

                </section>
            </div>
        )
    }
}


