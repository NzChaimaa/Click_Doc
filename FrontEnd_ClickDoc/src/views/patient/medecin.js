import React, { Component, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'


import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';
import ImageMedecin from '../../assets/img/medecin/default-medecin.png'

import { Link } from "react-router-dom";


export default class listMedecinRechercher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listeSpeciaites: [{ id: 0, label: " " }],
            listeVille: [{ id: 0, label: " " }],
            token:'',
            listeMedecins: []
        }
    }
    sendingSerchRequest = (d) => {
        console.log(d)
        Axios.get(`/api/search/medcins/${d.nom}&ville=${d.ville}&specialite=${d.specialite}`, { headers: { "Authorization": `Bearer ${this.props.donneUser.token}` } }).then((spec) => {
            this.setState({ listeMedecins:spec.data})
        }).catch((r) => console.error(r))
    }
    componentDidMount() {
        console.log(this.props.donneUser)
        Axios.get(`http://localhost:8015/api/get/specialite`, { headers: { "Authorization": `Bearer ${this.props.donneUser.token}` } } ).then((spec) => {
                this.setState({ listeSpeciaites: [...spec.data] })
            }).catch((r) => console.error(r))

        Axios.get(`http://localhost:8015/api/villes`, { headers: { "Authorization": `Bearer ${this.props.donneUser.token}` }} ).then((vil) => {
            console.log(vil)
                this.setState({ listeVille: [...vil.data] })
            }).catch((r) => console.error(r))      
    }
    render() {
        return (
            <div>
                <FormulaireRecherche
                    listeSpeciaites={this.state.listeSpeciaites}
                    listeVille={this.state.listeVille}
                    sendingSerch={this.sendingSerchRequest}
                />

                <CArdsContainer listeMedecins={this.state.listeMedecins} />
            </div>
        )
    }
}


function FormulaireRecherche(props) {
    const [ville, setVille] = useState("");
    const [specialite, setSpecialite] = useState("");

    const [nom, setNom] = useState("");

    const handleChangeVille = (e) => {
        setVille(e.target.value)
    }

    const handleChangeNom = (e) => {
        setNom(e.target.value)
    }

    const handleChangeSpecialite = (e) => {
        setSpecialite(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = {
            nom: nom, specialite: specialite, ville: ville
        }
        props.sendingSerch(data)
    }
    return (
        <Container className='mt-5 mr-5'>

            <Col lg="12" className="card-body">
                <form className="form" onSubmit={handleSubmit}>
                    <Row>
                        <Col lg="2" className="input-group input--large">
                            <TextField id="standard-basic" onChange={handleChangeNom} label="nom du médecin" value={nom} />
                        </Col>
                        <Col lg="3" className="input-group input--medium">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">spécialité rechércer</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={specialite}
                                    onChange={handleChangeSpecialite}
                                >
                                    {props.listeSpeciaites.map((e, i) => <MenuItem key={i} value={e.label}>{e.label}</MenuItem>)}

                                </Select>
                            </FormControl>
                        </Col>
                        <Col lg="3" className="input-group input--medium">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">l'emplacement </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={ville}
                                    onChange={handleChangeVille}
                                >
                                    {props.listeVille.map((e, i) => <MenuItem key={i} value={e.label}>{e.label}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Col>
                        <Col lg="2">
                            <button className="btn btn-submit mt-3" style={{ background: '#6ab2d8' }}  type="submit">search</button>
                        </Col>
                    </Row>
                </form>
            </Col>
        </Container>

    )
}


function CArdsContainer(props) {
    return (
        <div className='mr-5 container-sersh '>
            {
                props.listeMedecins.map((e, i) => {
                    return (
                        <Link className="col-lg-4" key={i} to={"/patient/medecin/" + e.id}>
                            <div className="card card-profile m-5">
                                <div className="card-avatar">
                                   <img className="img" src={ImageMedecin} />
                                 </div>
                                <div className="table">
                                    <h4 className="card-caption">{e.nom + " " + e.prenom}</h4>
                                    <h6 className="category text-muted">{e.specialite.label}</h6>
                                    <p className="card-description"> {e.description} </p>
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}
