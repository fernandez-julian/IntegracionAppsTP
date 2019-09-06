import React, { Component } from "react";
import { Form, Input, TextArea, Button, Select, Container, Header, Icon, Segment, Message, Confirm } from 'semantic-ui-react';
import SnackBar from '../../components/SnackBar';



class FromEstablecimiento extends Component {

    state = {
        openConfirm: false,
        openSnackBar: false,

        razonSocial: '',
        direccion: '',
        telefono: '',
    };

    resetForm = () => {
        document.getElementById("form").reset();
        this.setState({ razonSocial: '', direccion: '', telefono: ''});
    };

    openConfirm = () => this.setState({ openConfirm: true });

    closeConfirm = () => this.setState({ openConfirm: false });

   /* 
   handleConfirm = () => {
        this.closeConfirm();
        this.setState({ openSnackBar: true });
        setTimeout(() => this.setState({ openSnackBar: false }), 3000);
    };
    */

    handleInputs = (e) => {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        });
    }

    onSubmit = () => this.openConfirm();

    createEst = event => {
        this.closeConfirm();
        let requestBody = {};
        requestBody.razonSocial = this.state.razonSocial;
        requestBody.direccion = this.state.direccion;
        requestBody.telefono = this.state.telefono;
        fetch('/entidades/registrar', {

            method: "POST",
            body: JSON.stringify(requestBody),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        }).then(response => { return response.json() })
           .then(this.setState({ openSnackBar: true }));
           setTimeout(() => this.setState({ openSnackBar: false }), 3000);
    }; 

    render() {

        return (
            <Container>
                <Segment style={{ marginTop: '60px' }}>
                    <Header as='h2' icon textAlign='center' >
                        <Icon name='building' circular />
                        <Header.Content>Altas Establecimientos</Header.Content>
                    </Header>
                </Segment>
                <Segment>
                    <Form id='form' onSubmit={this.onSubmit}>
                        <Form.Group widths='equal'>
                            <Form.Field
                                id='form-input-control-razon-social'
                                control={Input}
                                label='Razón Social'
                                name='razonSocial'
                                placeholder='Razón Social' required
                                onChange={this.handleInputs}
                            />
                            <Form.Field
                                id='form-input-control-direccion'
                                control={Input}
                                label='Dirección'
                                name='direccion'
                                placeholder='Dirección' required
                                onChange={this.handleInputs}
                            />
                            <Form.Field
                                id='form-input-control-telefono'
                                control={Input}
                                label='Teléfono'
                                name='telefono'
                                placeholder='Teléfono' required
                                onChange={this.handleInputs}
                            />
                        </Form.Group>
                        <Form.Group widths='equal'>
                        </Form.Group>
                        {/* <Form.Field
                        id='form-textarea-control-opinion'
                        control={TextArea}
                        label='Opinion'
                        placeholder='Opinion'
                        />
                        <Form.Field
                        id='form-button-control-public'
                        control={Button}
                        content='Confirm'
                        label='Label with htmlFor'
                    />*/}
                        <Button.Group>
                            <Button onClick={this.resetForm}>Cancelar</Button>
                            <Button.Or />
                            <Button positive /*onClick={this.openConfirm}*/>Aceptar</Button>
                        </Button.Group>
                    </Form>
                </Segment>

                <Confirm
                    open={this.state.openConfirm}
                    onCancel={this.closeConfirm}
                    onConfirm={this.createEst}
                    content='¿Desea confirmar el alta del establecimineto?'
                    cancelButton='Cancelar'
                    confirmButton="Confirmar"
                />


                <SnackBar success open={this.state.openSnackBar} />{/*________________________NO SE RENDERIZA____________ */}


            </Container>
        );
    }
}

export default FromEstablecimiento
