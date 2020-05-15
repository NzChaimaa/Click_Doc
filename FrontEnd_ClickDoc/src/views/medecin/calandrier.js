import React, { Component } from 'react'
import Axios from 'axios'

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

import { Container, TextField } from '@material-ui/core';

import moment, { lang } from 'moment'
moment.locale('fr')
export default class calandrier extends Component {
    constructor(props) {
        super(props)
        this.state = {

          listeConsultation:[]

        }
    }

    componentDidMount() {
        Axios.get(` http://localhost:8015/api/medcin/reservation/${this.props.donneUser.id}`, { headers: { "Authorization": `Bearer ${this.props.donneUser.token}` } }).then((spec) => {
            this.setState({ listeConsultation: [...spec.data] })
        }).catch((r) => console.error(r))
    }
    render() {
        return (
            <div>

                <Container>
                    <Typography variant="h1" noWrap className='text-center' style={{ color: '#6ab2d8', marginTop: '-6rem' }}>
                   Calandrier
          </Typography>
                    <TableContainer component={Paper}>
                        <Table className="" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">motif</TableCell>
                                    <TableCell align="center">patient </TableCell>
                                    <TableCell align="center">date / heure</TableCell>
                                  

                                </TableRow>
                            </TableHead>
                            <TableBody>
                               
                                {this.state.listeConsultation.map((user, index) => (
                                    <TableRow key={user.id}>
                                        <TableCell component="th" scope="row">
                                            {user.motif} 
                                        </TableCell>
                                        <TableCell align="center">{user.patient.nom} </TableCell>
                                        <TableCell align="center"> {moment(user.date_de_reservation).lang('fr').format('dddd DD MMMM YYYY')}</TableCell>

                                       
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/* <EditModal show={this.state.show} saveChange={this.saveChange} handleClose={this.annulerModification} details={this.state.details} />
                    <DeleteModal show={this.state.showDelete} saveChange={this.saveChangeDelete} handleClose={this.annulerModificationDelete} details={this.state.details} /> */}
                </Container>
               
            </div>
        )
    }
}
