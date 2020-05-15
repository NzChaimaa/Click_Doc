import React, { Component, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { MdDone, MdClose} from 'react-icons/md';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
// import EditIcon from '@material-ui/icons/Edit';

import { Modal, Button } from 'react-bootstrap'

import axios from 'axios'
import { Container, TextField } from '@material-ui/core';


export default class listPatient extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listePatient: [],
            show: false,
            details: [],

            showDelete: false,

        }
    }
    getListePatient = (token) => {
        axios.get(`http://localhost:8015/api/patients`, { headers: { "Authorization": `Bearer ${token}` } }).then((pat) => {
            this.setState({ listePatient: [...pat.data] })
            console.log(pat.data)
        }).catch((r) => console.error(r))
    }
    componentDidMount() {
        axios.post(`http://localhost:8015/api/authenticate`, {
            username: "admin",
            password: "admin",

        }).then((res) => {
            this.setState({token: res.data.token})
            this.getListePatient(res.data.token)
        }
        ).catch((r) => console.error(r))
    }

    // editSpecialite = (id) => {
    //     this.setState({ show: !this.state.show, details: this.state.listeSpeciaites[id] })
    // }

    // annulerModification = () => {
    //     this.setState({ show: !this.state.show, details: [] })

    // }
    deletePatient = (id) => {
        this.setState({ showDelete: !this.state.showDelete, details: this.state.listePatient[id] })
    }
    // saveChange = (id, data) => {
    //     axios.put(`http://localhost:8015/specialite/${id}`, { label: data }).then((res) => {
    //         console.log(res, id)
    //     })
    // }
    saveChangeDelete = (id) => {
        axios.delete(`http://localhost:8015/api/medcins/${id}`, { headers: { "Authorization": `Bearer ${this.state.token}` } }).then((res) => {

            this.setState({ showDelete: !this.state.showDelete })
            this.getListeMedecin()
        })
    }
    annulerModificationDelete = () => {
        this.setState({ showDelete: !this.state.showshowDelete, details: [] })
    }

    render() {
        return (
            <div>
                <Typography variant="h1" noWrap className='text-center' style={{ color: '#6ab2d8', marginTop: '-6rem' }}>
                    Patients
          </Typography>
                <Container>
                    <TableContainer component={Paper}>
                        <Table className="" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">nom complet</TableCell>
                                    <TableCell align="center">email </TableCell>
                                    <TableCell align="center">Téléphone </TableCell>
                                    <TableCell align="center"></TableCell>
                                    <TableCell align="center"></TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.listePatient.map((Patient, index) => (
                                    <TableRow key={Patient.id}>
                                        <TableCell component="th" scope="row">
                                            {Patient.nom + " " + Patient.prenom}
                                        </TableCell>
                                        <TableCell align="center">{Patient.email}</TableCell>
                                        <TableCell align="center">{Patient.numero_de_telephone}</TableCell>

                                        <TableCell align="right">
                                            <Fab
                                                style={{ background: '#6ab2d8' }}
                                                aria-label="edit"
                                                onClick={() => this.editPatient(index)}
                                            >
                                                <MdDone />
                                            </Fab>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Fab
                                                style={{ background: '#ab0c0c' }}
                                                aria-label="delete"
                                                onClick={() => this.deletePatient(index)}
                                            >
                                                <MdClose />
                                            </Fab>
                                        </TableCell>


                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <EditModal show={this.state.show} saveChange={this.saveChange} handleClose={this.annulerModification} details={this.state.details} />
                    <DeleteModal show={this.state.showDelete} saveChange={this.saveChangeDelete} handleClose={this.annulerModificationDelete} details={this.state.details} />
                </Container>
            </div>
        )
    }
}

function EditModal(props) {
    const [nouveauNom, setNouveauNom] = useState("")
    const handleChange = (event) => {
        console.log(event.target.value)
        setNouveauNom(event.target.value)

    }
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>modification de la patient {props.details.label}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TextField onChange={handleChange} fullWidth id="standard-basic" label="nouveau nom de la patient" value={nouveauNom} />

            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => props.saveChange(props.details.id, nouveauNom)}>
                    enregistrer
          </Button>
                <Button variant="secondary" onClick={props.handleClose}>
                    annuler
          </Button>
            </Modal.Footer>
        </Modal>
    )

}
function DeleteModal(props) {

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>désactivation de la patients: {props.details.label}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                vous confirmer que vous voulez supprimer cette patient
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => props.saveChange(props.details.id)}>
                    confirmation
          </Button>
                <Button variant="secondary" onClick={props.handleClose}>
                    annuler
          </Button>
            </Modal.Footer>
        </Modal>
    )

}
