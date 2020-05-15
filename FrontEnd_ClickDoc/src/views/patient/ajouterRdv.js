import React, { Component, useState } from 'react'

import { Modal, Button, Row, Col } from 'react-bootstrap'

import TextField from '@material-ui/core/TextField';
import moment from 'moment'

import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import Axios from 'axios';


export default class ajouterRdv extends Component {

    constructor(props) {
        super(props)
        this.state = {
            startDate: moment(),
            selectedDate: (moment().day() % 6 == 0) ? (moment().add(1, 'days').day() % 6 == 0) ? moment().add(2, "days") : moment().add(1, "days") : moment(),
            details: { date: moment(), heure: '00:00' },
            disponibilite: {
                id: 1,
                debutMatin: "08:00:00",
                finMatin: "12:30:00",
                debutSoir: "14:30:00",
                finSoir: "19:00:00",
                dureeConsultation: "15"
            },
            show: false,
            reservation: []

        }

    }
    componentDidMount() {
        Axios.get(`http://localhost:8015/api/patients`).then((pat) => {
            this.setState({ patient: [...pat.data] })
        }).catch((r) => console.error(r))

        Axios.get(`http://localhost:8015/api/medcin/disponibilites/${this.props.medcin_id}`).then((dis) => {
            this.setState({ disponibilite: [...dis.data] })
        }).catch((r) => console.error(r))


        Axios.get(`http://localhost:8015/api/medcin/reservation/${this.props.medcin_id}/${this.state.selectedDate}`).then((reservation) => {
        this.setState({ reservation: [...reservation.data] })
         }).catch((r) => console.error(r))

    }
    changeDate = (e) => {
        if (e.currentTarget.name == 'next') {
            this.setState({ startDate: moment(this.state.startDate).add(7, 'days') })
        } else {
            if (moment(this.state.startDate).isAfter(moment())) {
                this.setState({ startDate: moment(this.state.startDate).subtract(7, 'days') })
            }
        }
    }

    selectDate = (d) => {
        this.setState({ selectedDate: d })
    }

    annulerModification = () => {
        this.setState({ details: { heure: '', date: '' }, show: false })

    }
    selectHour = (h) => {
        let details = { date: this.state.selectedDate, heure: h }
        this.setState({ show: true, details: details })
    }
    createCalendar = () => {

        let table = []
        let selectDateValue = moment(this.state.selectedDate)
        for (let i = 0; i <= 7; i++) {
            let date = moment(this.state.startDate).add('days', i)
            let Cl = "cal-cell cell "
            Cl += (moment(selectDateValue).format("YYYYMMDD") == moment(date).format("YYYYMMDD")) ? "selected" : ""
            if (!(date.day() % 6 == 0)) {
                table.push(<li key={i} className={Cl} onClick={this.selectDate.bind(null, date)}>
                    <div className="cell-content">
                        <div className="day">{date.format('ddd')} </div>
                        <div className="day-month">{date.format('D')}</div>
                        <div className="month">{date.format("MMM")}</div>
                    </div>
                </li>
                )
            }
        }
        return table

    }


    createHours = () => {

        let table = []
        let startHour = moment(this.state.disponibilite.debutMatin, 'HH:mm:ss')
        let i = 0
        let hour = startHour.format("HH:mm")

        do {
            table.push(<li key={i} className="cell hours-element" onClick={this.selectHour.bind(null, hour)}>
                <span className="hour">{hour}  </span>
            </li>
            )
            i++
            hour = moment(hour, 'HH:mm').add(this.state.disponibilite.dureeConsultation, 'minutes').format('HH:mm')

        } while (moment(hour, 'HH:mm').isBefore(moment(this.state.disponibilite.finMatin, 'HH:mm:ss')));

        startHour = moment(this.state.disponibilite.debutSoir, 'HH:mm:ss')
        hour = startHour.format("HH:mm")

        do {
            table.push(<li key={i} className="cell hours-element" onClick={this.selectHour.bind(null, hour)}>
                <span className="hour">{hour}  </span>
            </li>
            )
            i++
            hour = moment(hour, 'HH:mm').add(this.state.disponibilite.dureeConsultation, 'minutes').format('HH:mm')

        } while (moment(hour, 'HH:mm').isBefore(moment(this.state.disponibilite.finSoir, 'HH:mm:ss')));


        return table

    }


    render() {

        return (
            <section>
                <Col className="date-range-calendar">
                    <Row className="justify-content-center m-3">
                        <h4 className="text-primary">choisir un jours pour votre rendez-vous</h4>
                    </Row>
                    <Row className="range-calendar justify-content-center">
                        <button className="" name="preview" id="date-range-preview" onClick={this.changeDate}  ><MdChevronLeft /> </button>
                        <ul className="calendar"> {this.createCalendar()}</ul>
                        <button className="" name="next" id="date-range-next" onClick={this.changeDate}  > <MdChevronRight /> </button>
                    </Row>
                    <Row className="selected-date-area">
                        <Col>
                            <Row className="justify-content-center">
                                <h4> jours séléctionnée : {moment(this.state.selectedDate).format('dddd D MMMM YYYY')}</h4>
                            </Row>
                            <Row >
                                <ul className="hours">
                                    {this.createHours()}
                                </ul>
                               
                            </Row>
                        </Col>
                        <EditModal show={this.state.show} medecinId={this.props.medecinId} donneUser={this.props.patient} handleClose={this.annulerModification} details={this.state.details} sendData={this.sendData} />

                    </Row>
                </Col>
            </section>
        )
    }
}


function EditModal(props) {

  const [motif, setIt]=useState("")
    const setMotif = ( e ) =>{
        setIt(e.target.value)
    }
    const saveDonne = (e) => {
        e.preventDefault();
      
        let data1 = {
            "date_de_reservation": moment(props.details.date).format('YYYY-MM-DD') + "T" + props.details.heure + ":00.358Z",
            "medcin": {
                "id": props.medecinId
            },
            "motif": motif,
            "patient": {
                "id": props.donneUser.id
            },
            "status": 0,
        }
       
        Axios.post(` http://localhost:8015/api/reservation`, data1, { headers: { "Authorization": `Bearer ${props.donneUser.token}` } }).then(() => {
                props.handleClose()
            })

        
       
    }

    return (
        <Modal className="modal-margin" show={props.show} onHide={!props.show}>
            <Modal.Header closeButton>
                <Modal.Title>ajouter un nouveau rendez-vous avec ce médecin {moment(props.details.date).format('YYYY MMM dddd')} à {props.details.heure} </Modal.Title>
            </Modal.Header>
            <form onSubmit={saveDonne}>
                <Modal.Body>
                    <Row className="mt-5 justify-content-center">
                        <TextField id="standard-basic" label="motif" onChange={setMotif} value={motif} />
                    </Row>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        enregistrer
          </Button>

                    <Button variant="secondary" onClick={props.handleClose}>
                        annuler
          </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )

}