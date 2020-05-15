import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logo from '../assets/img/logo.svg'; // with import

import { Link } from "react-router-dom";

import { Navbar, Nav} from 'react-bootstrap'
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    
}));

export default function NavbarPublic(props) {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <AppBar position="static" style={{ background: '#6ab2d8' }}>
                <Toolbar className="d-flex justify-content-lg-between">
                    <div class="menu-sidebar">
                        <div id="nav_menu-2" class="sidebar-widget  widget_nav_menu">
                            <div class="menu-menu-partie-gauche-container">
                                <Navbar.Brand href="/public/professionnel-sante">Vous êtes médecin ?</Navbar.Brand>
                            </div>
                        </div>
                    </div>
                     
                       <img src={logo}
                        width="40"
                        height="40"
                        className="d-inline-block align-top"
                     />
                    
                    <Navbar expand="lg" >
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />

                        <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    <Nav.Link href="/public">Accueil</Nav.Link>
                                    <Nav.Link href="/public/authentification-patient">Login</Nav.Link>
                                <Nav.Link href="/public/inscription-patient">Inscription</Nav.Link>
                                </Nav>
                          
                        </Navbar.Collapse>
                    </Navbar>
                </Toolbar>
            </AppBar>
        </div>
    );
}



