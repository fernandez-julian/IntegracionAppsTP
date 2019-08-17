import React, { Component } from "react";
import card from './creditCard.png';
import ModalUser from './ModalUser';
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
                    <Segment >
                        <Header as='h3'>sección uno (Pueden ir estadisticas)</Header>
                        <Statistic.Group>
                            <Statistic>
                                <Statistic.Value>22</Statistic.Value>
                                <Statistic.Label>MOVIMIENTOS</Statistic.Label>
                            </Statistic>

                            <Statistic>
                                <Statistic.Value text>
                                    TRES<br />
                                    MIL
                                </Statistic.Value>
                                <Statistic.Label>SUSCRIPCIONES</Statistic.Label>
                            </Statistic>

                            <Statistic>
                                <Statistic.Value>
                                    <Icon name='plane' />
                                    5
                                </Statistic.Value>
                                <Statistic.Label>VUELOS</Statistic.Label>
                            </Statistic>

                            <Statistic>
                                <Statistic.Value>
                                    <Image src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' inline circular />
                                    42
                                </Statistic.Value>
                                <Statistic.Label>....</Statistic.Label>
                            </Statistic>
                        </Statistic.Group>

                        <Divider section />

                        <Header as='h3'>sección dos</Header>
                        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                    </Segment>
                </Container>

                <ModalUser open={this.state.openModalUsr} close={this.handleCloseModalUsr}/>

            </div>
            )
    }
}

export default UserPage