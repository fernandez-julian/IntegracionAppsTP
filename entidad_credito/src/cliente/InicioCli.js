import React, { Component } from "react";
import {
    Container,
    Header,
    Divider,
    Segment,
    Progress,
} from 'semantic-ui-react';


class InicioCli extends Component {
    state = {
        limite: null,
        dineroGastado: null,
        cardExistence: false,
    };

    componentDidMount() {
        let requestBody = {};
        requestBody.dni = this.props.cli[0]['dni'];
        let urlConsulta = `${"http://tarjetaback.herokuapp.com"}/tarjetas/obtenerPorCliente`;
        fetch(urlConsulta, {
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
                    var obj = JSON.parse(result);
                    if (this.state.cardExistence)
                        this.setState({ limite: obj.limite, dineroGastado: obj.dineroGastado });
                })
    };

    render() {
        const { limite, dineroGastado, cardExistence } = this.state;
        var percent = ((dineroGastado * 100) / limite).toFixed(0);
        let progress;
        if (cardExistence) {
            if (percent <= 50) {
                progress = <Progress percent={percent} progress color='green' />
            } else if (percent > 50 && percent <= 75) {
                progress = <Progress percent={percent} progress color='yellow' />
            } else if (percent > 75) {
                progress = <Progress percent={percent} progress color='red' />
            }
        }
        return (
            <Container>
                <Segment>
                    {cardExistence
                        ? progress
                        : 'No se registraron movimientos'}
                    <Divider section />
                    <Header as='h3'>Limite de la Tarjeta: {limite}</Header>
                    <Divider section />
                    <Header as='h3'>Dinero gastado en mes actual: {dineroGastado}</Header>
                </Segment>
            </Container>
        );
    }
}

export default InicioCli