import React, { Component } from "react";
import card from './creditCard.png';
import usr from './usr.png';
import {
  Container,
  Dropdown,
  Header,
  Image,
  Menu,
  Modal,
  Button,
  Icon,
} from 'semantic-ui-react';

class UserPage extends Component {
    state = {
        openModalUsr: false
    };

    handleOpenModalUsr = () =>{
        this.setState({ openModalUsr: true });
    };

    handleCloseModalUsr = () => {
        this.setState({ openModalUsr: false });
    }

    render() {
        return (
            <div>
                <Menu color='olive' relative inverted> {/*Cambiar despues de relative a fixed='top' */}
                <Container>
                    <Menu.Item as='a' header>
                    <Image  src={card} style={{ marginRight: '1.5em' }} />
                    Tarjeta de credito
                    </Menu.Item>
                    <Menu.Item as='a'>Inicio</Menu.Item>
                    <Menu.Item onClick={this.handleOpenModalUsr} as='a'>Usuario</Menu.Item>

                    <Dropdown item simple text='Dropdown'>
                    <Dropdown.Menu>
                        <Dropdown.Item>List Item</Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Header>Header Item</Dropdown.Header>
                        <Dropdown.Item>
                        <i className='dropdown icon' />
                        <span className='text'>Submenu</span>
                        <Dropdown.Menu>
                            <Dropdown.Item>List Item</Dropdown.Item>
                            <Dropdown.Item>List Item</Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                    <Menu.Item position='right' as='a'>Cerrar sesión</Menu.Item>
                </Container>
                </Menu>

                <Container text style={{ marginTop: '10px', borderStyle: 'solid',borderColor: 'red'}}>
                <Header as='h1'>Titulo</Header>
                <p>Amet adipisicing veniam nostrud pariatur officia sunt aute nulla. Consequat culpa excepteur id aute dolore deserunt tempor ex aliquip quis aliquip do. Ex officia ullamco magna sit duis culpa enim minim do occaecat irure. Cupidatat id eu veniam culpa mollit duis velit ea. Cupidatat anim cillum incididunt duis culpa.

                    Officia in eu culpa enim id incididunt do irure ea ut dolor duis consequat. Aliqua sunt culpa amet incididunt ad in. Amet ea aliqua commodo ullamco elit dolor esse veniam dolore consectetur. Occaecat sit laborum aliquip commodo non cillum nisi enim nulla ut. Officia enim anim elit sint. Dolor pariatur occaecat reprehenderit voluptate non adipisicing et sint minim tempor.</p>
                <p>
                    A text container is used for the main container, which is useful for single column layouts.
                </p>
                </Container>
                <Modal open={this.state.openModalUsr} onClose={this.handleCloseModalUsr}>
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
                        <Button color='red' onClick={this.handleCloseModalUsr} inverted>
                            <Icon name='window close' /> Cerrar
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
            )
    }
}

export default UserPage