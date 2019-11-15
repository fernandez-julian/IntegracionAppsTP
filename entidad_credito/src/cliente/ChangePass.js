import React, { Component } from 'react';
import { Modal, Icon, Button, Header, Container, Form, } from 'semantic-ui-react';
import SnackBar from '../components/SnackBar';
import animationData from './check.json';
import Lottie from 'react-lottie';

class ChangePass extends Component {

    state = {
        currentPass: '',
        newPass: '',
        openSnackBar: false,
        msj: '',

        success: false,
    };

    openSnackBar = (message) => {
        this.setState({ msj: message });
        this.setState({ openSnackBar: true });
    }

    closeSnackBar = () => this.setState({ openSnackBar: false });

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    resetForm = () => {
        document.getElementById("form").reset();
        this.setState({ currentPass: '', newPass: '', success: false });
    };

    handleExit = () => {
        this.resetForm();
        this.closeSnackBar();
        this.props.close();
    };

    onSubmit = () => {
        if (this.props.currentPass === this.state.currentPass) {
            if (this.state.currentPass !== this.state.newPass) {
                let requestBody = {};
                requestBody.usrEmail = this.props.usrEmail;
                requestBody.currentPass = this.state.currentPass;
                requestBody.newPass = this.state.newPass;
                let urlConsulta = `${"http://tarjetaback.herokuapp.com"}/clientes/cambiarPass`;
                fetch(urlConsulta, {
                    method: "POST",
                    body: JSON.stringify(requestBody),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                }).then(response => {
                    response.status === 200 ? this.setState({ success: true }) : this.openSnackBar('ocurrio un error')
                });
            }
            else {
                this.openSnackBar('La nueva contraseña debe ser distinta a la anterior');
            }
        }
        else {
            this.openSnackBar('Contraseña actual incorrecta');
        }
    };

    render() {
        const defaultOptions = {
            loop: false,
            autoplay: true,
            animationData: animationData,
        };
        return (
            <Container>
                <Modal open={this.props.open} onClose={this.props.close} basic size='small' dimmer='blurring'>
                    <Header icon='key' content='Cambiar contraseña' />
                    <Modal.Content>
                        <Form id='form' onSubmit={this.onSubmit}>
                            <Form.Input
                                placeholder='Contraseña actual' required
                                name='currentPass'
                                type="password"
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                placeholder='Nueva contraseña' required
                                name='newPass'
                                type="password"
                                onChange={this.handleChange}
                            />
                            <Button basic color='red' inverted onClick={this.handleExit}>
                                <Icon name='remove' /> Salir
                        </Button>
                            {this.state.success
                                ? <Lottie
                                    options={defaultOptions}
                                    height={150}
                                    width={150}
                                />
                                : <Button color='green' inverted type='submit'>
                                    <Icon name='checkmark' /> Aceptar
                                </Button>


                            }
                        </Form>
                    </Modal.Content>
                    <SnackBar info open={this.state.openSnackBar} close={this.closeSnackBar}>{this.state.msj}</SnackBar>
                    {
                    }
                </Modal>
            </Container>
        );
    }
}

export default ChangePass;