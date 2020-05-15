import React, { Component, useState } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';

import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

import AddIcon from '@material-ui/icons/Add';
import { Modal, Button, Col, Row } from 'react-bootstrap'

import axios from 'axios'
import { Container, TextField } from '@material-ui/core';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const outerTheme = createMuiTheme({
    // palette: {
    //     primary: {
    //         main: '#08bc83',
    //     },
    // },
});
export default class listSpicialite extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listeSpeciaites: [],
            show: false,
            details: [],

            showDelete: false,
            showAdd: false,
           
            token: this.props.donneUser.token
        }
    }
    getListeSpecialite = (token) => {

        axios.get(`http://localhost:8015/api/get/specialite`, { headers: { "Authorization": `Bearer ${this.props.donneUser.token}` } }).then((spec) => {
            this.setState({ listeSpeciaites: [...spec.data] })
        }).catch((r) => console.error(r))
    }
    componentDidMount() {
        this.getListeSpecialite()
    }
    editSpecialite = (id) => {
        this.setState({ show: !this.state.show, details: this.state.listeSpeciaites[id] })
    }

    annulerModification = () => {
        this.setState({ show: !this.state.show, details: [] })

    }
    deleteSpecialite = (id) => {
        this.setState({ showDelete: !this.state.showDelete, details: this.state.listeSpeciaites[id] })
    }
    saveChange = (id, data) => {
      
    }

    saveChangeDelete = (id) => {
      
    }
    annulerModificationDelete = () => {
        this.setState({ showDelete: !this.state.showshowDelete, details: [] })
    }

    addSpecialite = () => {
        this.setState({ showAdd: true })
    }
    saveChangeAdd = (lab) => {
  
    }
    annulerAdd = () => {
        this.setState({ showAdd: false })
    }
    render() {
        return (
            <ThemeProvider theme={outerTheme}>
                <Container>
                    <Typography variant="h1" noWrap className='text-center' style={{ color: '#6ab2d8', marginTop: '-6rem' }}>
                        ajouter Rendez-vous
          </Typography>
                    <Row className="m-5">
                        <Col>
                            <Fab onClick={this.addSpecialite} className="float-right" style={{ background: '#08bc83' }} aria-label="add">
                                <AddIcon />
                            </Fab>
                        </Col>
                        <AddModal show={this.state.showAdd} saveChange={this.saveChangeAdd} handleClose={this.annulerAdd} />

                    </Row>

                    <Row>

                        <Row className="d-flex justify-content-center w-100">
                            <Col lg="8" >
                                <TableContainer component={Paper}>
                                    <Table className="" aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">id</TableCell>
                                                <TableCell align="center">specialite</TableCell>
                                                <TableCell align="center"> action</TableCell>
                                                <TableCell align="center"></TableCell>


                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.listeSpeciaites.map((specialite, index) => (
                                                <TableRow key={specialite.id}>
                                                    <TableCell component="th" scope="row">
                                                        {specialite.id}
                                                    </TableCell>
                                                    <TableCell align="center">{specialite.label}</TableCell>
                                                    <TableCell align="center">
                                                        <Fab
                                                            style={{ background: ' #044e6e' }}
                                                            aria-label="edit"
                                                            onClick={() => this.editSpecialite(index)}
                                                        >
                                                            <EditIcon />
                                                        </Fab>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Fab
                                                            style={{ background: '#ab0c0c' }}
                                                            aria-label="delete"
                                                            onClick={() => this.deleteSpecialite(index)}
                                                        >
                                                            <FaRegTrashAlt />
                                                        </Fab>
                                                    </TableCell>

                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <EditModal show={this.state.show} saveChange={this.saveChange} handleClose={this.annulerModification} details={this.state.details} />
                                <DeleteModal show={this.state.showDelete} saveChange={this.saveChangeDelete} handleClose={this.annulerModificationDelete} details={this.state.details} />
                            </Col>
                        </Row>

                    </Row>
                </Container>
            </ThemeProvider>
        )
    }
}

function EditModal(props) {
    const [nouveauNom, setNouveauNom] = useState("")
    const handleChange = (event) => {
        setNouveauNom(event.target.value)

    }
    return (
        <Modal className="modal-margin" show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>modification de la spécialité {props.details.label}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TextField onChange={handleChange} fullWidth id="standard-basic" label="nouveau nom de la spécialité" value={nouveauNom} />

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
        <Modal className="modal-margin" show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>désactivation de la spécialitées: {props.details.label}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                vous confirmer que vous voulez supprimer cette spécialitées
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


function AddModal(props) {
    const [nouveauNom, setNouveauNom] = useState("")

    const handleChange = (event) => {
        setNouveauNom(event.target.value)
    }

    return (
        <Modal className="modal-margin" show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>ajouter une nouvelle spécialitées </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TextField onChange={handleChange} fullWidth id="standard-basic" label="nouveau nom de la spécialité" value={nouveauNom} />

            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => props.saveChange(nouveauNom)}>
                    enregistrer
          </Button>
                <Button variant="secondary" onClick={props.handleClose}>
                    annuler
          </Button>
            </Modal.Footer>
        </Modal>
    )

}