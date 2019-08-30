import React, { Component } from 'react';
import { Modal, Icon, Button, Header, Container, Form } from 'semantic-ui-react';

class ChangePass extends Component {
    render(){
        return(
            <Container>
                    <Modal open={this.props.open} onClose={this.props.close} basic size='small'>
                        <Header icon='archive' content='Cambiar contraseña' />
                        <Modal.Content>
                        <Form>
                            <Form.Field required>
                            <input placeholder='Contraseña actual' />
                            </Form.Field>
                            <Form.Field required>
                            <input placeholder='Nueva contraseña' />
                            </Form.Field>
                        </Form>
                        </Modal.Content>
                        <Modal.Actions>
                        <Button basic color='red' inverted onClick={this.props.close}>
                            <Icon name='remove' /> Cancelar
                        </Button>
                        <Button color='green' inverted>
                            <Icon name='checkmark' /> Aceptar
                        </Button>
                        </Modal.Actions>
                    </Modal>
                </Container>
        );
    }
}

export default ChangePass;