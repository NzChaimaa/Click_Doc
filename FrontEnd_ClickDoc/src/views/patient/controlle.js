import React, { Component } from 'react'
import Axios from 'axios'

import moment, { lang } from 'moment'

import {Table} from 'react-bootstrap'
moment.locale('fr')
export default class calandrier extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listeConsultation: []
        }
    }

    componentDidMount() {
        Axios.get(` http://localhost:8015/api/patients/reservations/${this.props.patient_id}$`, { headers: { "Authorization": `Bearer ${this.props.donneUser.token}` } }).then((spec) => {
            this.setState({ listeConsultation: [...spec.data] })
        }).catch((r) => console.error(r))
    }
    render() {
        return (
            <div className="list-reservation container" style={{marginTop:"10rem"}}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            {/* <th>#</th> */}
                            <th>medecin</th>
                            <th>date / heure</th>
                            <th> motif</th>
                        </tr>
                    </thead>
                    <tbody>
                      
                        {this.state.listeConsultation.map((e, i) =>
                            <tr>
                                <td>{e.patient.nom}</td>
                                {/* <td>Mark</td> */}
                                <td>{e.patient.nom} le {moment(e.date_de_reservation).lang('fr').format('dddd DD MMMM YYYY / HH:mm')}</td>
                                <td>{e.motif}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
              
            </div>
        )
    }
}
