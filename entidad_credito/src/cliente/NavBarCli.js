import React, { Component } from "react";
import card from './creditCard.png';
import { Link } from 'react-router-dom';
import {Menu, Container, Image, Icon} from 'semantic-ui-react';

class NavBarCli extends Component {


    render() {
        return (
            <Menu color='olive' relative inverted> {/*Cambiar despues de relative a fixed='top' */}
            <Container>
                <Menu.Item as='a' header>
                <Image  src={card} style={{ marginRight: '1.5em' }} />
                Tarjeta de credito
                </Menu.Item>
                <Menu.Item as='a'><Link to="/Inicio"><Icon name='home'/>Inicio</Link></Menu.Item>
                <Menu.Item as='a' onClick={this.props.OpenModalUsr}><Icon name='user circle'/>Usuario</Menu.Item>
                <Menu.Item as='a'><Link to='/Liquidaciones'><Icon name='newspaper outline'/>Liquidaciones mensuales</Link></Menu.Item>
               {/* <Dropdown item simple text='Dropdown'>
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
                </Dropdown>*/}
                <Menu.Item position='right' as='a' onClick={this.props.LogOut}><Icon name='sign-out'/>Cerrar sesión</Menu.Item>
            </Container>
            </Menu>
        );
    }
}

export default NavBarCli