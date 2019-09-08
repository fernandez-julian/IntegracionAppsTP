import React, { Component } from "react";
import { Form, Button, Container, Header, Icon, Segment, Confirm } from 'semantic-ui-react';
import SnackBar from '../../components/SnackBar';



class FromCli extends Component {

    state = {
        openConfirm: false,
        openSnackBar: false,

        nombre: '',
        fechaNac: '',
        dni: '',
        telefono: '',
        mail: '',
        clave: '',
    };

    resetForm = () => {
        document.getElementById("form").reset();
        this.setState({ nombre: '', fechaNac: '', dni: '', telefono: '', mail: '' });
    };

    openConfirm = () => this.setState({ openConfirm: true });

    closeConfirm = () => this.setState({ openConfirm: false });

    closeSnackBar = () => this.setState({ openSnackBar: false });

    onSubmit = () => this.openConfirm();

    handleInputs = (e) => {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        });
    };

    createCli = event => {
        this.closeConfirm();
        let requestBody = {};
        requestBody.nombre = this.state.nombre;
        requestBody.fechaNac = this.state.fechaNac;
        requestBody.dni = this.state.dni;
        requestBody.telefono = this.state.telefono;
        requestBody.mail = this.state.mail;
        fetch('/clientes/registrar', {

            method: "POST",
            body: JSON.stringify(requestBody),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        }).then(response => { return response.json() })
            .then(response => {
                this.setState({ clave: response.clave });
            }).then(this.setState({ openSnackBar: true }));
    };

    render() {

        return (
            <Container>
                <Segment style={{ marginTop: '60px' }}>
                    <Header as='h2' icon textAlign='center' >
                        <Icon name='users' circular />
                        <Header.Content>Altas clientes</Header.Content>
                    </Header>
                </Segment>
                <Segment>
                    <Form id='form' onSubmit={this.onSubmit}>
                        <Form.Group widths='equal'>
                            <Form.Input
                                label='Nombre'
                                name='nombre'
                                placeholder='Nombre y apellido' required
                                onChange={this.handleInputs}
                            />
                            <Form.Input
                                label='Fecha de nacimiento'
                                name='fechaNac'
                                placeholder='AA/MM/DD' required
                                onChange={this.handleInputs}
                            />
                            <Form.Input
                                label='DNI'
                                name='dni'
                                placeholder='DNI' required
                                onChange={this.handleInputs}
                            />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Input
                                label='Tel'
                                name='telefono'
                                placeholder='xxxx' required
                                onChange={this.handleInputs}
                            />
                            <Form.Input
                                label='Email'
                                name='mail'
                                placeholder='Email@...' required
                                onChange={this.handleInputs}
                            />
                        </Form.Group>
                        <Button.Group>
                            <Button onClick={this.resetForm}>Cancelar</Button>
                            <Button.Or />
                            <Button positive type='submit' /*onClick={this.onSubmit}*/>Aceptar</Button>
                        </Button.Group>
                    </Form>
                </Segment>

                <Confirm
                    open={this.state.openConfirm}
                    onCancel={this.closeConfirm}
                    onConfirm={this.createCli}
                    content='¿Desea confirmar el alta del cliente?'
                    cancelButton='Cancelar'
                    confirmButton="Confirmar"
                />

                <SnackBar success open={this.state.openSnackBar} close={this.closeSnackBar}>
                    La clave del cliente es {this.state.clave}
                </SnackBar>

            </Container>
        );
    };
};

export default FromCli
