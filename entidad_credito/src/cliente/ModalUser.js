import React, { Component } from "react";
import { Tab, Container, Grid } from 'semantic-ui-react'
import usr from './usr.png';
import {
    Image,
    Modal,
    Button,
    Icon,
    Menu,
    Segment,
    Card,
} from 'semantic-ui-react';

/*const panes = [
  { menuItem: 'Detalles', render: () => <Tab.Pane>
      <p>Nombre:</p>
      <p> Nombre usr:</p>
      <p>Sexo:</p>
      <p>Fecha nacimiento:</p>
      <p>DNI:</p>
      <p> Tel:</p>
      <p>Email:</p>
  </Tab.Pane> },
  { menuItem: 'Tarjetas', render: () => <Tab.Pane >Tab 2 Content</Tab.Pane> },
]*/

class ModalUser extends Component {

    state = {
        activeItem: 'home',
        usr: this.props.usr,
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {

        const { activeItem } = this.state


        return (
            <Container>
                <Modal open={this.props.open} onClose={this.props.close}>
                    <Modal.Header>{this.state.usr[0]['nombre']}</Modal.Header>
                    <Modal.Content image>
                        <Grid columns={2} divided>
                            <Grid.Row stretched>
                                <Grid.Column>
                                    <Card>
                                        <Image src={usr} wrapped ui={false} size='medium' />
                                        <Card.Content>
                                            <Card.Header>{this.state.usr[0]['mail']}</Card.Header>
                                            <Card.Meta>
                                                <span className='date'>{this.state.usr[0]['tipo']}</span>
                                            </Card.Meta>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                                <Modal.Description>
                                    <Grid.Column>
                                        <Segment>
                                            <Menu pointing>
                                                <Tab.Pane style={{paddingRight: 60}}>
                                                    <p>Nombre: {this.state.usr[0]['nombre']}</p>
                                                    <p> Nombre Usuario: {this.state.usr[0]['mail']}</p>
                                                    <p>Fecha Nacimiento: {this.state.usr[0]['fechaNac']}</p>
                                                    <p>DNI: {this.state.usr[0]['dni']}</p>
                                                    <p> Tel: {this.state.usr[0]['telefono']}</p>
                                                </Tab.Pane>
                                            </Menu>
                                        </Segment>

                                    </Grid.Column>
                                </Modal.Description>
                            </Grid.Row>
                        </Grid>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='red' onClick={this.props.close} inverted>
                            <Icon name='window close' /> Cerrar
                            </Button>
                    </Modal.Actions>
                </Modal>
            </Container>
        );
    }
}
export default ModalUser;