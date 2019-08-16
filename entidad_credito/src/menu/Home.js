import React, { Component } from "react";
import {Menu, Grid, Button} from 'semantic-ui-react';
import LogIn from '../logIn/LogIn';


let styles = theme => ({
    Menu:{
        marginBottom: theme.spacing(98),
    }
});

class Home extends Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    
    render() {
        const { activeItem } = this.state
        
        return (
            <div class="ui container">
                <Grid columns={1} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Menu>
                                <Menu.Item
                                    name='Inicio'
                                    active={activeItem === 'Inicio'}
                                    onClick={this.handleItemClick}
                                >
                                    Inicio
                                </Menu.Item>

                                <Menu.Item name='Otro' active={activeItem === 'Otro'} onClick={this.handleItemClick}>
                                    Otro
                                </Menu.Item>

                                <Menu.Item
                                    name='otro2'
                                    active={activeItem === 'otro2'}
                                    onClick={this.handleItemClick}
                                >
                                    otro2
                                </Menu.Item>
                            </Menu>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row></Grid.Row>
                    <Grid.Row></Grid.Row>
                    <Grid.Row></Grid.Row>
                    <Grid.Row>
                        <Grid.Column> 
                            <LogIn/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}
export default Home;