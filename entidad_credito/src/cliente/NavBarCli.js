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
               {}
                <Menu.Menu position='right'>
                    <Menu.Item onClick={this.props.openChangePass}><Icon name='settings'/></Menu.Item>
                    <Menu.Item onClick={this.props.LogOut}><Icon name='sign-out'/>Cerrar sesión</Menu.Item>
                 </Menu.Menu>
                
            </Container>
            </Menu>
        );
    }
}

export default NavBarCli