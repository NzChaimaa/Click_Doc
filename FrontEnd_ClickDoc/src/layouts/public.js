import React, { Component } from 'react'
import {Route, Switch } from "react-router-dom";

import {Container} from 'react-bootstrap'


import AuthPatient from '../views/public/authPatient';
import AuthMedecien from '../views/public/authMedecien';
import AuthAdmin from '../views/public/authAdmin';

import FonctionnalitePatient from '../views/public/fonctionnalite';
import FonctionnaliteProfessionnel from '../views/public/fonctionnaliteProfessionnel';
import FonctionnaliteAdmin from '../views/public/fonctionnaliteAdmin';

import InscriptionMedecien from '../views/public/inscriptionMedecien';
import InscriptionPatient from '../views/public/inscriptionPatient';
import InscriptionAdmin from '../views/public/inscriptionAdmin';

import NavbarPublic from '../component/navbar'
import NavbarPublicProfessionnel from '../component/navbarProfessionnel'
import NavbarAdmin from '../component/navbarAdmin'

export default class Public extends Component {
   
    render() {
        return (
            <div>
                {(window.location.pathname == "/public/professionnel-sante" || window.location.pathname == "/public/authentification-medecin" || window.location.pathname == "/public/inscription-medecin") ?
                    <>
                        <NavbarPublicProfessionnel />
                        <Banner />
                    </>
                     :
                    (window.location.pathname == "/public/admin" || window.location.pathname == "/public/authentification-admin" || window.location.pathname == "/public/inscription-admin") ?
                    <>
                        <NavbarAdmin />
                        <BannerAdmin />
                    </>
                     :
                    <>
                        <NavbarPublic />
                        <BannerProfessionnel />
                    </>            

                }
                <Switch>
                    <Route exact path="/public" component={FonctionnalitePatient} />
                    <Route exact path="/public/professionnel-sante" component={FonctionnaliteProfessionnel} />
                    <Route exact path="/public/admin" component={FonctionnaliteAdmin} />

                    <Route exact path="/public/authentification-patient" render={(props) => <AuthPatient authentified={this.props.patientauthentified} {...props} />}  />
                    <Route exact path="/public/authentification-medecin" render={(props) => <AuthMedecien authentified={this.props.medecinAuthentified} {...props} />}   />
                    <Route exact path="/public/authentification-admin" render={(props) => <AuthAdmin adminAuthentified={this.props.adminAuthentified} {...props} />} />
                    <Route exact path="/public/inscription-medecin" render={(props) => <InscriptionMedecien authentified={this.props.medecinAuthentified} {...props} />} />
                    <Route exact path="/public/inscription-patient" render={(props) => <InscriptionPatient authentified={this.props.medecinAuthentified} {...props} />} />
                    <Route exact path="/public/inscription-admin" render={(props) => <InscriptionAdmin adminAuthentified={this.props.adminAuthentified} {...props} />} />
                </Switch>
                          
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
                    <p className="fadeInUp animated">
                        Intégrez la téléconsultation à votre pratique médicale.
				</p>
                </Container>
            </div>
        </div>
    )
}

function BannerProfessionnel() {
    return (
        <div className="hero_home version_1" >
            <div className="content">
                <h3 className="fadeInUp animated">Trouver un médecin!</h3>
                <p className="fadeInUp animated">
                    Ridiculus sociosqu cursus neque cursus curae ante scelerisque vehicula.
				</p>
                
            </div>
        </div>
    )
}

function BannerAdmin() {
    return (
        <div className="hero_home version_1">
            <div className="content">
                <Container>
                    <h3 className="fadeInUp animated ">Géstion des cabinets médical</h3>
                    <p className="fadeInUp animated">
                        Intégrez les médecins et les patients dans la plateforme médicale.
				</p>
                </Container>
            </div>
        </div>
    )
}