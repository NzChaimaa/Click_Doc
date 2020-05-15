import React, { Component } from 'react'
import Axios from 'axios'

import AjouterRdv from './ajouterRdv'
import InfoMedecin from '../medecin/profilMedecin'
export default class ProfilMedecin extends Component {
    constructor(props){
        super(props)
        this.state={
            medecinId: this.props.match.params.id,
            medecinInfo:{},
            ajouterColapse:false,
            patient: this.props.donneUser
        }

    }
    componentDidMount(){
        Axios.post(`http://localhost:8015/api/authenticate`, {
            username: "admin",
            password: "admin"
        }).then((res) => {
            this.setState({ token: res.data.token })
            Axios.get(`http://localhost:8015/api/medcins/${this.state.medecinId}` , { headers: { "Authorization": `Bearer ${res.data.token}` } }).then((med) => {
                this.setState({ medecinInfo: { ...med.data } })
            }).catch((r) => console.error(r))
        })
      

    }
    setShow = () =>{
        this.setState({ ajouterColapse: !this.state.ajouterColapse})
    }
    render() {
        return (
            <div className="container " style={{marginTop:"10rem"}}>

                { (this.state.medecinId == undefined) ? <h1>vous n'avez choisis aucun médecin</h1>:

                    this.state.medecinInfo.id!=undefined && 
                    <div>
                        <InfoMedecin medecinInfo={this.state.medecinInfo} setShow={this.setShow} />

                        {this.state.ajouterColapse &&
                        <div className="mt-5">
                            <AjouterRdv medecinId={this.state.medecinId} patient={this.state.patient}/>
                            </div>
                                
                                }
                    </div>
                }
            </div>
            

            

        )
    }
}
