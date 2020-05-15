import React, { Component, useState } from 'react'
import { Modal, Button, Col, Row } from 'react-bootstrap'

import InputNumber from 'rc-input-number';
import 'rc-input-number/assets/index.css';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// import { TextField } from '@material-ui/core';
import { FaHourglassHalf } from 'react-icons/fa'

import moment from 'moment'
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
    TimePicker,
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import Axios from 'axios';
import Cookie from 'js-cookie'

const outerTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#8DC63F',
        },
    },
});


export default class listJourHeure extends Component {
    constructor(props) {
        super(props)

        this.state = {
            show: false,
            details: { 
                // id:1,
                heure_de_debut: "2020-05-14T08:31:04.424Z", 
                heure_de_fin: "2020-05-14T08:31:04.424Z", 
                jour_de_debut: "2020-05-14T08:31:04.424Z", 
                jour_de_fin: "2020-05-14T08:31:04.424Z",
                medecin_id: 0 
            }
        }
    }

   componentDidMount(){
       let token = ""

       if (Cookie.get('userAuth')) {
           let admin = Cookie.getJSON('userAuth');
           token = admin.token
           this.setState({admin : admin})
           console.log(token)
       } else {
           
       }
       this.setState({ token: token })
       Axios.get(`http://localhost:8015/api/disponibilites`, { headers: { "Authorization": `Bearer ${token}` } }).then((dispo) => {
        //    this.setState({ details: dispo.data[0] })
       }).catch((r) => console.error(r))
    }

    annulerModification=()=>{
        this.setState({ show: false})
    }

    setShow = () =>{
        this.setState({ show: true })
    }

    sendData = (id, data)=>{
        console.log(this.state.token)
        Axios.post(`http://localhost:8015/api/disponibilites`, { headers: { "Authorization": `Bearer ${this.state.token}` } },  { ...data, id: this.state.admin.id }).then((res) => {
            this.setState({ details: data, show: false })
        })
        console.log(id, data)
    }

    render() {
       
        return (
            
            <ThemeProvider theme={outerTheme}>
                <div >
                    <Typography variant="h1" noWrap className='text-center' style={{ color: '#6ab2d8', marginTop: '-6rem', fontSize: '30' }}>
                        Heurs Travail
          </Typography>
                    <Heure setShow={this.setShow} details={this.state.details} />
                    <EditModal show={this.state.show} handleClose={this.annulerModification} details={this.state.details} sendData={this.sendData} />
                </div>
            </ThemeProvider>
            
        )

    }
}
function Heure(props){
    return(
        
        <Col lg="6">
        <div className="working-time item">
                <FaHourglassHalf color="white" size="1.5rem" />
            <h2>Working Hours</h2>
                <ul className="w-hours">
                    <li>matin - <span>{moment(props.details.debutMatin, "HH:mm:ss").format('HH:mm')} - {moment(props.details.finMatin, "HH:mm:ss").format('HH:mm')} </span></li>
                    <li>aprés midi - <span> {moment(props.details.debutSoir, "HH:mm:ss").format('HH:mm')} -  {moment(props.details.finSoir, "HH:mm:ss").format('HH:mm')}</span></li>
                    <li>duree de consultation  - <span> {props.details.dureeConsultation} min</span></li>

            </ul>
            <Row className="justify-content-center">
            <button className="btn btn-primary" onClick={props.setShow}>modifier</button>
            </Row>
        </div>
        </Col>
        
    )
}

function EditModal(props) {

    const [heure_de_debut, setDebutMatin] = useState(new Date("January 01 1970 "+ props.details.debutMatin));
    const [heure_de_fin, setFinMatin] = useState(new Date("January 01 1970 " + props.details.finMatin));

    const [jour_de_debut, setDebutSoir] = useState(new Date("January 01 1970 " + props.details.debutSoir));
    const [jour_de_fin, setFinSoir] = useState(new Date("January 01 1970 " + props.details.finSoir));


    const [dureeConsultation, setDureeConsultation] = useState(15);

    const saveDonne = (e) =>{
        e.preventDefault();
        props.sendData(props.details.id, { heure_de_debut: moment(heure_de_debut).format('HH:mm:ss'), heure_de_fin: moment(heure_de_fin).format('HH:mm:ss'), jour_de_fin: moment(jour_de_fin).format('HH:mm:ss'), jour_de_debut: moment(jour_de_debut).format('HH:mm:ss') })

    }
  
 

    return (
        
        <Modal className="modal-margin" show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>modification des heurs de travails</Modal.Title>
            </Modal.Header>
            <form onSubmit={saveDonne}>
            <Modal.Body>                
                
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Col>
                        <label>les heure du marche matin</label>
                        <Row className="justify-content-around">
                        <TimePicker
                                    value={heure_de_debut}
                        label="heure de début"
                        ampm={false}
                        onChange={setDebutMatin}
                        autoOk
                         />
                    <TimePicker
                        value={heure_de_fin}
                        label="heure de fin"
                        ampm={false}
                        onChange={setFinMatin}
                        autoOk
                    />
                        </Row>
                        </Col>
                        <Col>
                        <label>les heure du marche de l'aprés midi</label>

                    <Row className="justify-content-around mt-5">
                        {/* <TimePicker
                            value={jour_de_debut}
                            label="heure de début"
                            ampm={false}
                            onChange={setDebutSoir}
                            autoOk
                        />
                        <TimePicker
                                    value={jour_de_fin}
                            label="heure de fin"
                            ampm={false}
                                    onChange={setFinSoir}
                            autoOk
                        /> */}
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Date picker inline"
                                    value={jour_de_debut}
                                    onChange={setDebutSoir}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Date picker inline"
                                    value={jour_de_fin}
                                    onChange={setFinSoir}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                    </Row>
                    </Col>
                    </MuiPickersUtilsProvider>
              
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