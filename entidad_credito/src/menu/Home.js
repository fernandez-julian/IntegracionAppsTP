import React, { Component } from "react";
import {Menu, Grid, Container} from 'semantic-ui-react';
import LogIn from '../logIn/LogIn';


class Home extends Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    
    render() {
        const { activeItem } = this.state;
        
        return (
            
            <Container >
                <Grid columns={1} divided> 
                    <Grid.Row style={{marginBottom: 150}}>{/*Ver porque no puedo crear un objeto con props css*/}
                        <Grid.Column>
                           
                        </Grid.Column>
                    </Grid.Row>
                   
                    <Grid.Row>
                        <Grid.Column> 
                            <LogIn setUsr={this.props.setUsr}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}
export default Home;