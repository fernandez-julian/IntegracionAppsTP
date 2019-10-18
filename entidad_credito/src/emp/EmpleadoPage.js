import React, { Component } from "react";
import card from '../usr/creditCard.png';
import {
  Container,
  Dropdown,
  Header,
  Image,
  Menu,
  Icon,
  Divider,
  Segment,
  Statistic,
  Input,
  Button,
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

    handleLogOut = () =>{
        this.props.logOut();
    };

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
                    <Menu.Item as='a' onClick={this.handleOpenModalUsr}>Usuario</Menu.Item>

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
                    <Menu.Item position='right' as='a' onClick={this.handleLogOut}>Cerrar sesión</Menu.Item>
                </Container>
                </Menu>

                <Container>
                    <Segment>
                        <Header as='h3'>Secccion Clientes</Header>
                        <Input
                        action={{ color: 'blue', content: 'Buscar' }}
                        icon='search'
                        iconPosition='left'
                        placeholder='DNI cliente'
                        />

                        <Button
                        color='teal'
                        content='Registrar nuevo cliente'
                        icon='add user'
                        labelPosition='left'
                        />

                        <Divider section />

                        <Header as='h3'>Seccion tarjeta de credito</Header>
                        <Button
                        color='teal'
                        content='Cargar establecimiento'
                        icon='add' 
                        labelPosition='left'
                        />
                        <Button
                        color='teal'
                        content='Ver establecimiento'
                        icon='ordered list'
                        labelPosition='left'
                        />

                        <Divider section />

                        <Header as='h3'>Seccion establecimientos</Header>
                        <Button
                        color='teal'
                        content='Ver establecimiento'
                        icon='ordered list'
                        labelPosition='left'
                        />

                    </Segment>
                </Container>

                
            </div>
            )
    }
}

export default UserPage