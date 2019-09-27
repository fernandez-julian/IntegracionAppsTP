import React, { Component } from 'react';
import { Modal, Icon, Button, Container, Form, } from 'semantic-ui-react';
import SnackBar from './SnackBar';

class ModalEditTarjeta extends Component {

    state = {
        limite: '',
    };

    resetForm = () => {
        document.getElementById("form").reset();
        this.setState({ limite: ''});
    };

    handleExit = () => {
        this.resetForm();
        this.props.close();
    };

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleSubmit = () => {
        this.props.editTarjeta(this.state.limite, this.props.item.dni)
    };

    closeSnackBar = () => this.setState({ /*openSnackBar: false*/ });

    render() {
        return (
            <Container>
                <Modal open={this.props.open} onClose={this.props.close} >
                    <Modal.Header>Editar</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <p>Nro Tarjeta: {this.props.item.nroTarjeta} </p>
                            <p> Dinero Gastado: {this.props.item.dineroGastado} </p>
                            <p>Fecha Vencimiento: {this.props.item.fechaVto} </p>
                            <p>Código Seguridad: {this.props.item.codSeg} </p>
                            <p>DNI Asociado: {this.props.item.dni} </p>
                            <Form id='form' onSubmit={this.handleSubmit}>
                                <Form.Input
                                    label='Limite'
                                    fluid
                                    iconPosition="left"
                                    placeholder={this.props.item.limite}
                                    name='limite'
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


export default ModalEditTarjeta;