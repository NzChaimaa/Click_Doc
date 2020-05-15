
import React, { Component } from "react";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { AlarmAdd } from '@material-ui/icons';


import Questionnaire from "../components/questionnaire";
import ChoixSpecification from "../components/suvisTraitement/ChoixSpecification";

import { DefaultPage, AddPage } from './../theme/pageTransition';

import CardContainer from '../components/card/index'
import listeMedic from '../liste-medic.svg'

function Chart () {
  return (
    <DefaultPage>
       <CardContainer image={listeMedic} title="données d'obsérvance envers les médicament"  >
            <ChoixSpecification />
      </CardContainer >
      {/* <ChoixSpecification /> */}
      <div className="d-flex justify-content-center">
            <Link className="btn btn-primary m-5 d-flex align-items-center justify-content-around" variant="primary" to="/patient/observance/ajout"> répondre aux questions 
              <AlarmAdd className="ml-3" />
            </Link>
          </div>
    </DefaultPage>
  );
}


function DetailsPage() {
  return (
    <AddPage> 
      <Questionnaire />
    </AddPage>
  );
}

class Traitement extends Component {
  
  componentDidMount() {
    document.title = "PELIA | traitement"
  }
  render(){
  return (
    <Router>
      <Route
        render={({ location }) => {
          return (
              <TransitionGroup component={null}>
                <CSSTransition
                  timeout={300}
                  classNames="page"
                  key={location.key}
                >
                  <Switch location={location}>
                    <Route exact path="/patient/observance/ajout" component={DetailsPage} />
                    <Route exact path="/patient/observance" component={Chart} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
          );
        }}
      />
    </Router>
  );
}
}
export default Traitement