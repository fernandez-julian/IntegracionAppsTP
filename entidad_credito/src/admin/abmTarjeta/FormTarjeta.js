import React, { Component } from "react";
import { Form, Input, TextArea, Button, Select, Container, Header, Icon, Segment, Message, Confirm } from 'semantic-ui-react';
import SnackBar from '../../components/SnackBar';



class FromTarjeta extends Component {

    state = {
        openConfirm: false,
        openSnackBar: false,

        dni: '',
        limit: '',

        createMessage: null,
    };

    resetForm = () => {
        document.getElementById("form").reset();
        this.setState({ nombre: '', fechaNac: '', dni: '', telefono: '', mail: '' });
    };

    openConfirm = () => this.setState({ openConfirm: true });

    closeConfirm = () => this.setState({ openConfirm: false });

    closeSnackBar = () => this.setState({ openSnackBar: false, createMessage: null });

    onSubmit = () => this.openConfirm();

    handleInputs = (e) => {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        });
    };

    resetForm = () => {
        document.getElementById("form").reset();
        this.setState({ dni: '', limit: ''});
    };

    createCard = event => {
        this.closeConfirm();
        let requestBody = {};
        requestBody.dni = this.state.dni;
        requestBody.limit = this.state.limit;
        fetch('/tarjetas/registrar', {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        }).then(response => { 
            return response.json() })
            .then(response => {
                this.setState({ createMessage: response });
            }).then(this.setState({ openSnackBar: true }));
    };

    render() {

        return (
            <Container>
                <Segment style={{ marginTop: '60px' }}>
                    <Header as='h2' icon textAlign='center' >
                        <Icon name='address card icon' circular />
                        <Header.Content>Alta tarjeta</Header.Content>
                    </Header>
                </Segment>
                <Segment>
                    <Form id='form' onSubmit={this.onSubmit}>
                        <Form.Group widths='equal'>
                            <Form.Input
                                name='dni'
                                label='DNI del Cliente'
                                placeholder='DNI' required
                                onChange={this.handleInputs}
                            />
                            <Form.Input
                                name='limit'
                                label='Limite de tarjeta'
                                placeholder='$' required
                                onChange={this.handleInputs}
                            />
                        </Form.Group>
                        <Button.Group>
                            <Button onClick={this.resetForm}>Cancelar</Button>
                            <Button.Or />
                            <Button positive type='submit'>Aceptar</Button>
                        </Button.Group>
                    </Form>
                </Segment>

                <Confirm
                    open={this.state.openConfirm}
                    onCancel={this.closeConfirm}
                    onConfirm={this.createCard}
                    content='¿Desea confirmar el alta de la tarjeta?'
                    cancelButton='Cancelar'
                    confirmButton="Confirmar"
                />

                <SnackBar info open={this.state.openSnackBar} close={this.closeSnackBar}>
                    {this.state.createMessage}
                </SnackBar>


            </Container>
        );
    }
}

export default FromTarjeta
