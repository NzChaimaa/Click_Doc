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
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';



import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';



import { FaPhone, FaPersonBooth, FaMailBulk, FaKey } from 'react-icons/fa'

import PhoneNumber from '../../component/inputs/PhoneNumber'
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

import moment from 'moment'


export default class SignUp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listeSpecialite: [],
            token: '',
            listeVille:[]
        }
    }
    getListeSpecialite = (token) => {

        Axios.get(`http://localhost:8015/api/get/specialite`, { headers: { "Authorization": `Bearer ${token}` }}).then((spec) => {

            this.setState({ listeSpecialite: [...spec.data] })
        }).catch((r) => console.error(r))
    }
    getListevilles = (token) => {

        Axios.get(`http://localhost:8015/api/villes`, { headers: { "Authorization": `Bearer ${token}` } }).then((spec) => {
            this.setState({ listeVille: [...spec.data] })
        }).catch((r) => console.error(r))
    }
    componentDidMount(){
        // ************************************************************************ mniin ithayad JWT 3la ville ou specilite ndécomenter hado ***********
        // Axios.get(`http://localhost:8015/api/get/specialite`).then((spec) => {
           
        //     this.setState({ listeSpecialite: [...spec.data] })
        //     console.log(spec.data)
        // }).catch((r) => console.error(r))
        // Axios.get(`http://localhost:8015/api/villes`).then((spec) => {
        //     this.setState({ listeVille: [...spec.data] })
        // }).catch((r) => console.error(r))

        Axios.post(`http://localhost:8015/api/authenticate`, {    
        username: "admin",
        password: "admin",
            
        }).then((res) => {
            this.setState({ token: res.data.token})
            this.getListeSpecialite(res.data.token)
            this.getListevilles(res.data.token)

        })
    }
    
    savePatient = (e) => {
        e.preventDefault()
        let state = this.state
        if (state.password == state.confirmation_password) {
            if (state.firstName != null && state.lastName != null && state.email != null && state.numero_telephone != null) {
              
                let data = {
                    "adresse": state.adresse,
                    "createdAt": "2020-01-30T08:50:31.808Z",
                    "description": state.description,
                    "duree_de_consultation": "2020-01-30T08:50:31.808Z",
                    "email": state.email,
                    "nom": state.firstName,
                    "numero_de_telephone":state.numero_telephone,
                    "numero_inp": state.numero_telephone_cabinet,
                    "password": state.password,
                    "prenom": state.lastName,
                    "role": {
                        "id": 2
                    },
                    "specialite": {
                        "id": state.specialite,
                        "label": "Dentiste"
                    },
                    "specialition": "string",
                    "updatedAt": "2020-01-30T08:50:31.808Z",
                    "username": state.firstName,
                    "ville": {
                        "id": state.ville,
                        "label": "youssoufia"
                    }
                }
                console.log(data)
                Axios.post(`http://localhost:8015/api/login/medcin`, data).then((use) => {
                    this.setState({ compteCreated: true, userData: use.data })
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
    handleChangeSpecialite = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleChangeVille = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleChangePhone = (v, n) => {
        this.setState({ numero_telephone: v })
    }

    handleChangePhoneCabinet = (v,n) =>{
        this.setState({ numero_telephone_cabinet: v })

    }
    render() {
        if (this.state.compteCreated) {
            this.props.authentified(this.state.userData)

            return <Redirect to={`/medecin`} />

        }
        return (
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <div className="mt-5 d-flex flex-column align-items-center">
                    <Avatar className="bg-primary m-3">
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        créer un nouveau compte médecin
                    </Typography>
                    <form className="" onSubmit={this.savePatient}>
                        <Grid className="" container justify="flex-end">
                            {/* <Grid item>
                                vous avez déjà un compte?
                            <Link to="/authentification-medecin" variant="body2">
                                    accéder à votre compte
                            </Link>
                            </Grid> */}
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid className="mt-5" item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
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
                            <Grid className="mt-5" item xs={12} sm={6}>
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
                            <Grid className="mt-5" item xs={12} sm={6}>
                                <TextField
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    autoComplete="fname"
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
                            <Grid className="mt-5" item xs={12} sm={6}>
                                <PhoneNumber
                                    name="numero_telephone"
                                    placeholder="+212 661 000 000"
                                    required={true}
                                    helperText="obligatoire"
                                    labelInput="numero de telephone"
                                    icone={FaPhone}
                                    changingValue={this.handleChangePhone}
                                />
                            </Grid>
                            <Grid className="mt-5" item xs={12} sm={6}>
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
                                </Grid>
                            <Grid className="mt-5" item xs={12} sm={6}>
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
                          
                        </Grid>


                        <hr />


                       
                        <Grid container spacing={2}>
                            <Grid className="mt-5" item xs={12} sm={12}>
                                <FormControl fullWidth className="">
                                    <InputLabel >la spécialité</InputLabel>
                                    <Select
                                        
                                        
                                        name="specialite"
                                        value={this.state.specialite}
                                        onChange={this.handleChangeSpecialite}
                                    >
                                        {this.state.listeSpecialite.map((e, i) => <MenuItem key={e.id} value={e.id}>{e.label}</MenuItem>)}
                                        
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid className="mt-5" item xs={12} sm={6}>
                                <TextField
                                    value={this.state.adresse}
                                    onChange={this.handleChange}

                                    required
                                    fullWidth
                                    id="adresse"
                                    label="adresse du cabinet"
                                    name="adresse"
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
                            <Grid className="mt-5" item xs={12} sm={12}>
                                <FormControl fullWidth className="">
                                    <InputLabel >la ville</InputLabel>
                                    <Select
                                        
                                        
                                        name="ville"
                                        value={this.state.ville}
                                        onChange={this.handleChangeVille}
                                    >
                                        {this.state.listeVille.map((e, i) => <MenuItem key={i} value={e.id}>{e.label}</MenuItem>)}

                                    </Select>
                                </FormControl>
                            </Grid>
                            
                            <Grid className="mt-5" item xs={12} sm={6}>
                                <PhoneNumber
                                    name="numero_telephone_cabinet"
                                    placeholder="+212 661 000 000"
                                    required={true}
                                    helperText="obligatoire"
                                    labelInput="numero de telephone du cabinet"
                                    icone={FaPhone}
                                    changingValue={this.handleChangePhoneCabinet}
                                />
                            </Grid>
                            <Grid className="mt-5" item xs={12} sm={6}>
                                <TextField
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    autoComplete="fname"
                                    required
                                    fullWidth
                                    id="description"
                                    label="description du cabinet"
                                    name="description"
                                    autoComplete="description"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <FaMailBulk color="#6ab2d8" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid className="mt-5" item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="#6ab2d8" />}
                                    label="Je souhaite recevoir des rappel, des promotions marketing et des mises à jour par e-mail."
                                />
                            </Grid>
                        </Grid>
                        <Grid  item xs={12} className="d-flex justify-content-center mt-5">
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

