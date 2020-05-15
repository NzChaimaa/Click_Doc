import React, { Component } from 'react';
import {Route, Switch, Redirect } from "react-router-dom";
import Cookie from 'js-cookie'

import Patient from '../views/medecin/patient';
import Calandrier from '../views/medecin/calandrier';
import ListJourHeur from '../views/medecin/listJourHeure'
import MiniDrawer from '../component/Medcien/sidebar'

import routes from '../component/Medcien/routes'
import { Container } from 'react-bootstrap';


import profil from './../assets/img/medecin/member1.png'


export default class medecin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            medecinInfo: null,
            isAuth: true
        }
        
    }
    componentDidMount(){
        if (Cookie.get('userAuth') ){
            let medecin = Cookie.getJSON('userAuth')
            this.setState({ medecinInfo: medecin, isAuth: true} )
         }else{
             this.setState({isAuth: false})
         }
    }
  
    render() {

        if(!this.state.isAuth){
            return <Redirect to="/public" />
        }
        if (this.state.medecinInfo == null) {
            return null
        }
        return (

            <div>
                <MiniDrawer routes={routes} /> 
                
                <section className="main-site">
                    <Container>
                        <div id="medecin">
                            <Switch >

                                <Route exact path="/medecin" render={(props) => <ProfilMedecin medecinInfo={this.state.medecinInfo} {...props} />} />
                                <Route exact path="/medecin/patient" render={(props) => <Patient donneUser={this.state.medecinInfo} {...props} />} />
                                <Route exact path="/medecin/calandrier/" render={(props) => <Calandrier donneUser={this.state.medecinInfo} {...props} />} />
                                <Route exact path="/medecin/heure-disponibilite" render={(props) => <ListJourHeur donneUser={this.state.medecinInfo} {...props} />} />

                            </Switch>
                        </div>

                    </Container>
                </section>     
            </div>
        )
    }
}


 class ProfilMedecin extends Component {
    render() {
        return (
            <div>
                <section>
                    <div className="container mt-5 border p-2">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-xd-12">
                                <img src={profil} className="img-fluid img-responsive img-thumbnail" />
                            </div>
                            <div className="col-lg-6 col-md-6 col-xd-12 pt-4">
                                <h1>DR. {this.props.medecinInfo.nom + " " + this.props.medecinInfo.prenom}</h1>
                                <span> adresse </span>
                                <p> {this.props.medecinInfo.adresse} </p>
                                <span>Phone</span>
                                <p> {this.props.medecinInfo.numero_telephone} </p>

                                <button type="button" onClick={() => this.props.setShow()} className="btn mr-5 ttt">Appointment</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

