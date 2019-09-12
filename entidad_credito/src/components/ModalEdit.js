import React, { Component } from 'react';
import { Modal, Icon, Button, Header, Container, Form, } from 'semantic-ui-react';
import SnackBar from './SnackBar';

class ModalEdit extends Component {

    state = {
        direccion: '',
        telefono: '',
    };

    resetForm = () => {
        document.getElementById("form").reset();
        this.setState({ direccion: '', telefono: '' });
    };

    handleExit = () => {
        this.resetForm();
        this.props.close();
    };

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleSubmit = () => {
        this.props.editEstablecimiento(this.state.direccion, this.state.telefono, this.props.item.idEntidad)
    };

    closeSnackBar = () => this.setState({ /*openSnackBar: false*/ });

    render() {
        return (
            <Container>
                <Modal open={this.props.open} onClose={this.props.close} >
                    <Modal.Header>Editar</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Header>{this.props.item.razonSocial}</Header>
                            <Form id='form' onSubmit={this.handleSubmit}>
                                <Form.Input
                                    label='Dirección'
                                    fluid
                                    iconPosition="left"
                                    placeholder={this.props.item.direccion}
                                    name='direccion'
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    label='Telefono'
                                    fluid
                                    iconPosition="left"
                                    placeholder={this.props.item.telefono}
                                    name='telefono'
                                    onChange={this.handleChange}
                                />
                                <Button basic color='red' onClick={this.handleExit}>
                                    <Icon name='cancel' /> Cancelar
                                </Button>
                                <Button color='green' type='submit'>
                                    <Icon name='checkmark' /> Editar
                                </Button>
                            </Form>
                        </Modal.Description>
                    </Modal.Content>
                    <SnackBar success open={this.props.successEdit} close={this.closeSnackBar}>Edición satisfactoria</SnackBar>
                </Modal>
            </Container >
        );
    }
}


export default ModalEdit;