import React from 'react';
import { Container } from 'react-bootstrap';


export default function Fonctionnalite() {
    return (

        <section class="py-5" style={{marginTop: '-10rem' }}>
            <div className="hero_home version_1">
                <div className="content">
                    <Container>
                        <h3 className="fadeInUp animated ">Géstion des cabinets médical</h3>
                    </Container>
                </div>
            </div>
            <div class="container margin_120_95">
                <div class="main_title">
                    <h2>Discover the <strong>online</strong> appointment!</h2>
                    <p>Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat cu pri. In eum omnes molestie. Sed ad debet scaevola, ne mel.</p>
                </div>
                <div class="row add_bottom_30">
                    <div class="col-lg-4">
                        <div class="box_feat" id="icon_1">
                            <span></span>
                            <h3>Find a Doctor</h3>
                            <p>Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat cu pri. In eum omnes molestie.</p>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="box_feat" id="icon_2">
                            <span></span>
                            <h3>View profile</h3>
                            <p>Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat cu pri. In eum omnes molestie.</p>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="box_feat" id="icon_3">
                            <h3>Book a visit</h3>
                            <p>Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat cu pri. In eum omnes molestie.</p>
                        </div>
                    </div>
                </div>
                <p class="text-center"><a href="list.html" class="btn_1 medium">Find Doctor</a></p>

            </div>
        </section>
    )
}
