import React, { useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {  Redirect } from "react-router-dom";
// import logo from '../assets/img/logo.svg'; // with import
import Cookies from 'js-cookie'
import logo from '../../assets/img/logo.svg'; // with import

import { Navbar, Nav } from 'react-bootstrap'


export default function NavbarPAtient(props) {
    const [disConected, setdisConected] = useState(false)
    const disconnected = (e) => {
        e.preventDefault();
        Cookies.remove('userAuth');
        setdisConected(true)        
    }
    if(disConected){
        return <Redirect to="/public" />
    }
    return (
        <div >
            <AppBar position="fixed" style={{ background: '#6ab2d8' }}>
                <Toolbar className="d-flex justify-content-between">
                 
                    <Typography variant="h6" className="">
                        Mr/Mme. 
                        {props.donneUser.nom}
          </Typography>
                    <img src={logo}
                        width="40"
                        height="40"
                        className="d-inline-block align-top"
                    />
                    <Navbar bg="transparent" expand="lg">
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />

                        <Navbar.Collapse id="basic-navbar-nav">
                           
                            <Nav className="mr-auto ">
                                <Nav.Link href="/patient">Accueil</Nav.Link>
                                <Nav.Link href="/patient/medecin">Recherche</Nav.Link>
                                <Nav.Link href="/patient/rendez-vous">Rendez-vous</Nav.Link>
                                <Nav.Link onClick={disconnected}>Déconnexion</Nav.Link>
                                
                            </Nav>

                        </Navbar.Collapse>
                    </Navbar>
                </Toolbar>
            </AppBar>
        </div>
    );
}
