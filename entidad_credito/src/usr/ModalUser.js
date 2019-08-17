import React, { Component } from "react";
import usr from './usr.png';
import {
    Header,
    Image,
    Modal,
    Button,
    Icon,
  } from 'semantic-ui-react';

class ModalUser extends Component {
    render(){
        return(              
                
                <Modal open={this.props.open} onClose={this.props.close}>
                    <Modal.Header>Nombre de usuario</Modal.Header>
                    <Modal.Content image>
                    <Image wrapped size='medium' src={usr} />
                    <Modal.Description>
                        <Header>titulo</Header>
                        <p>-----------------------------------------------.</p>
                        <p>-----------------------------------------------.</p>
                    </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='red' onClick={this.props.close} inverted>
                            <Icon name='window close' /> Cerrar
                        </Button>
                    </Modal.Actions>
                </Modal>
        );
    }
}
export default ModalUser;