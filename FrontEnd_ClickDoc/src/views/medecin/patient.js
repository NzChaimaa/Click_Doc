import React, { Component, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { MdDone, MdClose } from 'react-icons/md';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';

import { Modal, Button } from 'react-bootstrap'

import axios from 'axios'
import { Container, TextField } from '@material-ui/core';


export default class listReservation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listeReservation: [],
            show: false,
            details: [],

            showDelete: false,

        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8015/api/reservationm/${this.props.donneUser.id}/0`, { headers: { "Authorization": `Bearer ${this.props.donneUser.token}` } }).then((pat) => {
            this.setState({ listeReservation: [...pat.data] })
            console.log(pat.data)
        }).catch((r) => console.error(r))
    }

 
    deleteReservation = (id) => {
        // this.setState({ showDelete: !this.state.showDelete, details: this.state.listeReservation[id] })
    }
    // saveChange = (id, data) => {
    //     axios.put(`http://localhost:8015/specialite/${id}`, { label: data }).then((res) => {
    //         console.log(res, id)
    //     })
    // }
    editReservation = (data) => {
    //  /api/reservation/{id}
        // axios.put(`http://localhost:8015//api/reservation/${data.id}`,data).then((res) => {
            //     console.log(res, id)
            // })
    }
    annulerModificationDelete = () => {
        // this.setState({ showDelete: !this.state.showshowDelete, details: [] })
    }

    render() {
        return (
            <div>
                <Typography variant="h1" noWrap className='text-center' style={{ color: '#6ab2d8', marginTop: '-6rem' }}>
                    Reservations
                </Typography>
                <Container>
                    <TableContainer component={Paper}>
                        <Table className="" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">nom complet</TableCell>
                                    <TableCell align="center">email </TableCell>
                                    <TableCell align="center">Motif</TableCell>
                                    <TableCell align="center"></TableCell>
                                    <TableCell align="center"></TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.listeReservation.map((user, index) => (
                                    <TableRow key={user.id}>
                                        <TableCell component="th" scope="row">
                                            {user.patient.nom + " " + user.patient.prenom}
                                        </TableCell>
                                        <TableCell align="center">{user.patient.email}</TableCell>
                                        <TableCell align="center">{user.motif}</TableCell>

                                        <TableCell align="right">
                                            <Fab
                                                style={{ background: '#6ab2d8' }}
                                                aria-label="edit"
                                                onClick={() => this.editReservation(user)}
                                            >
                                                <MdDone />
                                            </Fab>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Fab
                                                style={{ background: '#ab0c0c' }}
                                                aria-label="delete"
                                                onClick={() => this.deleteReservation(index)}
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
                <Modal.Title>modification de la Reservation {props.details.label}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TextField onChange={handleChange} fullWidth id="standard-basic" label="nouveau nom de la Reservation" value={nouveauNom} />

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
                <Modal.Title>désactivation de la Reservation: {props.details.label}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                vous confirmer que vous voulez supprimer cette Reservation
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
