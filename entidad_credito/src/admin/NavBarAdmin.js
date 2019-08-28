import React, { Component } from "react";
import card from '../cliente/creditCard.png';
import { Link } from 'react-router-dom';
import {Menu, Container, Image, Dropdown, Icon} from 'semantic-ui-react';

class NavBarAdmin extends Component {


    render() {
        return (
            <Menu color='olive' relative inverted> {/*Cambiar despues de relative a fixed='top' */}
            <Container>
                <Menu.Item as='a' header>
                <Image  src={card} style={{ marginRight: '1.5em' }} />
                Tarjeta de credito
                </Menu.Item>
                <Dropdown item simple text='Clientes'>
                    <Dropdown.Menu>
                        <Dropdown.Item><Link to="/FormCli" style={{ color: 'black' }}>Registrar</Link></Dropdown.Item>
                        <Dropdown.Item><Link to="/SearchCli" style={{ color: 'black' }}>Buscar</Link></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown item simple text='Tarjeta credito'>
                    <Dropdown.Menu>
                        <Dropdown.Item><Link to="/Inicio" style={{ color: 'black' }}>Alta</Link></Dropdown.Item>
                        <Dropdown.Item><Link to="/Inicio" style={{ color: 'black' }}>Buscar</Link></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown item simple text='Establecimientos'>
                    <Dropdown.Menu>
                        <Dropdown.Item><Link to="/Inicio" style={{ color: 'black' }}>Alta</Link></Dropdown.Item>
                        <Dropdown.Item><Link to="/Inicio" style={{ color: 'black' }}>Buscar</Link></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                
                <Menu.Item position='right' as='a' onClick={this.props.LogOut}><Icon name='sign-out'/>Cerrar sesión</Menu.Item>
            </Container>
            </Menu>
        );
    }
}

export default NavBarAdmin