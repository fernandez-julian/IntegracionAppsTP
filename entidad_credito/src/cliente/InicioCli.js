import React, { Component } from "react";
import {
    Container,
    Header,
    Image,
    Icon,
    Divider,
    Segment,
    Statistic,
  } from 'semantic-ui-react';


class InicioCli extends Component {
    render(){
        return(
            <Container>
                    <Segment >
                        <Header as='h3'>sección uno (Pueden ir estadisticas)</Header>
                        <Statistic.Group>
                            <Statistic>
                                <Statistic.Value>22</Statistic.Value>
                                <Statistic.Label>MOVIMIENTOS</Statistic.Label>
                            </Statistic>

                            <Statistic>
                                <Statistic.Value text>
                                    TRES<br />
                                    MIL
                                </Statistic.Value>
                                <Statistic.Label>SUSCRIPCIONES</Statistic.Label>
                            </Statistic>

                            <Statistic>
                                <Statistic.Value>
                                    <Icon name='plane' />
                                    5
                                </Statistic.Value>
                                <Statistic.Label>VUELOS</Statistic.Label>
                            </Statistic>

                            <Statistic>
                                <Statistic.Value>
                                    <Image src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' inline circular />
                                    42
                                </Statistic.Value>
                                <Statistic.Label>....</Statistic.Label>
                            </Statistic>
                        </Statistic.Group>

                        <Divider section />

                        <Header as='h3'>sección dos</Header>
                        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                    </Segment>
                    <Segment>
                        
                    </Segment>
                </Container>
        );
    }
}

export default InicioCli