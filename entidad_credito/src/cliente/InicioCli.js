import React, { Component } from "react";
import {
    Container,
    Header,
    Divider,
    Segment,
} from 'semantic-ui-react';


class InicioCli extends Component {
    state = {
        limite: null,
        dineroGastado: null,
        cardExistence : false,
    };

    componentDidMount() {
        let requestBody = {};
        requestBody.dni = this.props.cli[0]['dni'];
        fetch('/tarjetas/obtenerPorCliente', {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        })
            .then(response => {
                if (response.status === 200) {
                    this.setState({ cardExistence: true })
                    return response.json();
                }
                else {
                    this.setState({ cardExistence: false })
                    return response.json();
                }
            })
            .then(
                (result) => {
                    if (this.state.cardExistence)
                    this.setState({ limite: result.limite, dineroGastado: result.dineroGastado})
                    console.log(this.state)
                })
    };

    render() {
        const { limite, dineroGastado, cardExistence } = this.state;
        return (
            <Container>
                <Segment >
                    <Header as='h2'>Limite de la Tarjeta: {limite}</Header>
                    <Divider section />
                    <Header as='h2'>Dinero gastado en mes actual: {dineroGastado}</Header>
                </Segment>
            </Container>
        );
    }
}

export default InicioCli