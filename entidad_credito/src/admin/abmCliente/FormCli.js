import React, { Component } from "react";
import { Form, Input, TextArea, Button, Select, Container, Header, Icon, Segment, Message, Confirm } from 'semantic-ui-react';
import SnackBar from '../SnackBar';



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
        this.setState({nombre:'', fechaNac:'', dni:'', telefono:'', mail:''});
    };

    openConfirm = () => this.setState({ openConfirm: true });

    closeConfirm = () => this.setState({ openConfirm: false });

    closeSnackBar = () => this.setState({openSnackBar: false});

    onSubmit = () => this.openConfirm();

    handleInputs = (e) => {
        const {value, name} = e.target;
        this.setState({
            [name]: value
          });
        console.log(this.state);
    }

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
        this.setState({clave: response.clave});
      }).then(this.setState({ openSnackBar: true }));
    };

    render(){
        
        return(
            <Container>
                <Segment style={{marginTop:'60px'}}>
                    <Header as='h2' icon textAlign='center' >
                    <Icon name='users' circular />
                    <Header.Content>Altas clientes</Header.Content>
                    </Header>
                </Segment>
                <Segment>
                    <Form id='form' onSubmit={this.handleSubmit}>
                        <Form.Group widths='equal'>
                        <Form.Input
                            label='Nombre'
                            name='nombre'
                            placeholder='Nombre y apellido'
                            onChange={this.handleInputs}
                        />
                        <Form.Input
                            label='Fecha de nacimiento'
                            name='fechaNac'
                            placeholder='DD/MM/AA'
                            onChange={this.handleInputs}
                        />
                        <Form.Input
                            label='DNI'
                            name='dni'
                            placeholder='DNI'
                            onChange={this.handleInputs}
                        />
                        </Form.Group>
                        <Form.Group widths='equal'>
                        <Form.Input
                            label='Tel'
                            name='telefono'
                            placeholder='xxxx'
                            onChange={this.handleInputs}
                        />
                        <Form.Input
                            label='Email'
                            name='mail'
                            placeholder='Email@...'
                            onChange={this.handleInputs}
                        />
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
                        <Button positive onClick={this.onSubmit}>Aceptar</Button>
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
