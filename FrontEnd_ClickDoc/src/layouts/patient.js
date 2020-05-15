import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import { Route, Switch, Redirect } from "react-router-dom";
import Cookie from 'js-cookie'

import Medecin from '../views/patient/medecin';
import MedecinProfil from '../views/patient/ProfilMedecin';

import Controlle from '../views/patient/controlle';


import Patients from '../component/Patient/Patients'
import NavbarPatient from '../component/Patient/navbar'
import Axios from 'axios';

export default class patient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_info: null,
            isAuth: true
        }
    }
    componentDidMount() {
        if (Cookie.get('userAuth') ){
            let patient = Cookie.getJSON('userAuth')
            this.setState({ user_info: patient, isAuth: true } )
         }else{
             this.setState({isAuth: false})
         }
    }
    render() {
        // if(!this.state.isAuth){
        //     return <Redirect to="/public" />
        // }
        // if (this.state.user_info == null) {
        //     return null
        // }
        if (!this.state.isAuth) {
            return <Redirect to="/public" />
        }
        if (this.state.user_info == null) {
            return null
        }
        
        
        return (
            <div>
                <NavbarPatient donneUser={this.state.user_info} />
                <Banner />
                <section className='main'>
                    <Switch>
                        <Route exact path="/patient" render={(props) => <Patients donneUser={this.state.user_info} {...props} />} />
                        <Route exact path="/patient/medecin" render={(props) => <Medecin donneUser={this.state.user_info} {...props} />} />
                        <Route exact path="/patient/medecin/:id" render={(props) => <MedecinProfil donneUser={this.state.user_info} {...props} />} />
                        <Route exact path="/patient/rendez-vous" render={(props) => <Controlle donneUser={this.state.user_info} {...props} />} />
                    </Switch>
                </section>

            </div>
        )
    }
}

function Banner() {
    return (
        <div className="hero_home version_1">
            <div className="content">
                <Container>
                    <h3 className="fadeInUp animated ">Solution de Géstion des cabinets médical</h3>
                </Container>
            </div>
        </div>
    )
}