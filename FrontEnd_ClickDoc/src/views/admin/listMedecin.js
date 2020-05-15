import React, { Component, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { MdDone, MdClose} from 'react-icons/md';
import Fab from '@material-ui/core/Fab';
// import EditIcon from '@material-ui/icons/Edit';

import { Modal, Button } from 'react-bootstrap'

import axios from 'axios'
import { Container, TextField } from '@material-ui/core';
import Cookie from 'js-cookie'


export default class listSpicialite extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listeItems: [],
            show: false,
            details: [],

            showDelete: false,

        }
    }

    componentDidMount() {
        let token = ""

        if (Cookie.get('userAuth')) {
            let admin = Cookie.getJSON('userAuth');
            token = admin.token
        } else {
            this.setState({ isAuth: false })
        }
        console.log(token)
        axios.get(`http://localhost:8015/api/medcins`, { headers: { "Authorization": `Bearer ${token}` } }).then((spec) => {
            this.setState({ listeItems: [...spec.data] })
        }).catch((r) => console.error(r))
            this.setState({ tokent: token})
    }
    deleteMedecin = (id) => {
        this.setState({ showDelete: !this.state.showDelete, details: this.state.listeItems[id] })
    }

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
                    Medecin
          </Typography>
                <Container>
                    <TableContainer component={Paper}>
                        <Table className="" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell>id</TableCell> */}
                                    <TableCell align="center">nom complet</TableCell>
                                    <TableCell align="center">specialite </TableCell>
                                    <TableCell align="center">adresse</TableCell>
                                    <TableCell align="center">ville</TableCell>
                                    <TableCell align="center"></TableCell>
                                    <TableCell align="center"></TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.listeItems.map((specialite, index) => (
                                    <TableRow key={specialite.id}>
                                        <TableCell component="th" scope="row">
                                            {specialite.nom + " " + specialite.prenom}
                                        </TableCell>
                                        <TableCell align="center">{specialite.specialite.label}</TableCell>
                                        <TableCell align="center">{specialite.adresse}</TableCell>

                                        <TableCell align="center">{specialite.ville.label}</TableCell>

                                        <TableCell align="right">
                                            <Fab
                                                style={{ background: '#6ab2d8' }}
                                                aria-label="edit"
                                                onClick={() => this.editSpecialite(index)}
                                            >
                                                <MdDone />
                                            </Fab>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Fab
                                                style={{ background: '#ab0c0c' }}
                                                aria-label="delete"
                                                onClick={() => this.deleteMedecin(index)}
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
                <Modal.Title>modification de la medecin {props.details.label}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TextField onChange={handleChange} fullWidth id="standard-basic" label="nouveau nom de la medecin" value={nouveauNom} />

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
                <Modal.Title>désactivation de la medecin: {props.details.label}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                vous confirmer que vous voulez supprimer cette medecin
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
