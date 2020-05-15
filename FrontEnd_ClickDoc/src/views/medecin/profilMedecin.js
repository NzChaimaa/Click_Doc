import React, { Component } from 'react'

import profil from '../../assets/img/medecin/member1.png'

export default class profilMedecin extends Component {
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
