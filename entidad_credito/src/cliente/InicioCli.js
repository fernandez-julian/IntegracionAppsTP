import React, { Component } from "react";
import {
    Container,
    Header,
    Table,
    Divider,
    Segment,
    Statistic,
} from 'semantic-ui-react';


class InicioCli extends Component {
    state = {
        movements: [],
        movementsExistence: false,
    };

    componentDidMount() {
        let requestBody = {};
        requestBody.dni = this.props.cli[0]['dni'];
        fetch('/movimientos/topCinco', {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        })
            .then(response => {
                if (response.status === 200) {
                    this.setState({ movementsExistence: true })
                    return response.json();
                }
                else {
                    this.setState({ movementsExistence: false })
                    return response.json();
                }
            })
            .then(
                (result) => {
                    if (this.state.movementsExistence)
                        this.setState({ movements: JSON.parse(result) })
                })
    };

    render() {
        const { movements, movementsExistence } = this.state;
        return (
            <Container>
                <Segment >
                    <Header as='h2'>ULTIMOS MOVIMIENTOS</Header>
                    <Statistic.Group>
                        <Statistic>
                            <Statistic.Value>{movements.length}</Statistic.Value>
                            <Statistic.Label>MOVIMIENTOS</Statistic.Label>
                        </Statistic>
                    </Statistic.Group>

                    <Divider section />

                    <Statistic.Group>
                        <Table celled fixed>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>
                                        Fecha
                                     </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Razon social
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Monto
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {movementsExistence
                                    ? movements.map(item => (
                                        <Table.Row>
                                            <Table.Cell>{item.fecha}</Table.Cell>
                                            <Table.Cell>{item.razonSocial}</Table.Cell>
                                            <Table.Cell>$ {item.monto}</Table.Cell>
                                        </Table.Row>
                                    ))
                                    : null
                                }

                            </Table.Body>
                        </Table>
                    </Statistic.Group>
                </Segment>
            </Container>
        );
    }
}

export default InicioCli