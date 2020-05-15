import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';

import { FaPersonBooth, FaMailBulk, FaKey } from 'react-icons/fa'
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

import moment from 'moment'

export default class SignUp extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }
    saveAdmin = (e) => {
        e.preventDefault()
        let state = this.state
        if (state.password == state.confirmation_password) {
            if (state.firstName != null && state.lastName != null && state.email != null) {

                let data = {
                    "email": state.email,
                    "nom": state.firstName,
                    "password": state.password,
                    "prenom": state.lastName,
                    "role": {
                        "id": 1
                    },
                    "username": state.firstName 
                }
                Axios.post(`http://localhost:8015/api/login/admin`, data).then((us) => {
                    this.setState({ compteCreated: true, userData: us.data })
                }).catch((r) => this.setState({ compteCreated: false })
                )
            }
        } else {
            this.setState({ passwordError: true })
        }


    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {

        if (this.state.compteCreated) {
            this.props.adminAuthentified(this.state.userData)

            return <Redirect to={`/admin`} />

        }
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Grid container justify="flex-end">
                    <Grid item>
                        vous avez déjà un compte?
                    <Link to="/authentification-admin" variant="body2">
                            accéder à votre compte
                    </Link>
                    </Grid>
                </Grid>
                <div className="mt-5 d-flex flex-column align-items-center">
                    <Avatar className="bg-primary m-3">
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        créer un nouveau compte admin
        </Typography>
                    <form className="mt-5" onSubmit={this.saveAdmin}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="off"
                                    value={this.state.firstName}
                                    onChange={this.handleChange}
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="prenom"
                                    autoFocus
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <FaPersonBooth color="#6ab2d8" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={this.state.lastName}
                                    onChange={this.handleChange}

                                    required
                                    fullWidth
                                    id="lastName"
                                    label="nom"
                                    name="lastName"
                                    autoComplete="lname"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <FaPersonBooth color="#6ab2d8" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    autoComplete="off"
                                    required
                                    fullWidth
                                    id="email"
                                    label="adresse mail"
                                    name="email"
                                    autoComplete="email"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <FaMailBulk color="#6ab2d8" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={this.state.password}
                                    onChange={this.handleChange}

                                    autoComplete="fname"
                                    required
                                    fullWidth
                                    name="password"
                                    label="mot de passe"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <FaKey color="#6ab2d8" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    value={this.state.confirmation_password}
                                    onChange={this.handleChange}

                                    autoComplete="fname"
                                    required
                                    fullWidth
                                    name="confirmation_password"
                                    label="confirmer votre mot de passe"
                                    type="password"
                                    id="password-confirmation"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <FaKey color="#6ab2d8" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="#6ab2d8" />}
                                    label="Je souhaite recevoir des rappel, des promotions marketing et des mises à jour par e-mail."
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className="d-flex justify-content-center m-5">
                            <Button
                                type="submit"
                                variant="contained"
                                style={{ background: '#6ab2d8' }}
                                className=""
                            >
                                s'enregistrer
                    </Button>
                        </Grid>


                    </form>
                </div>

            </Container>
        );
    }
}