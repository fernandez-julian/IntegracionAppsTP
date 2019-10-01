import React, { Component } from "react";
import { Grid, Container } from 'semantic-ui-react';
import LogIn from '../logIn/LogIn';
import SnackBar from '../components/SnackBar';


class Home extends Component {
    state = {
        openSnackBar: false,
        msj: '',
    };

    openSnackBar = (message) => {
        this.setState({ msj: message });
        this.setState({ openSnackBar: true });
    }

    closeSnackBar = () => this.setState({ openSnackBar: false });

    render() {

        return (

            <Container >
                <Grid columns={1} divided>
                    <Grid.Row style={{ marginBottom: 150 }}>
                        <Grid.Column>

                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <LogIn setUsr={this.props.setUsr} openSnackBar={this.openSnackBar} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <SnackBar error open={this.state.openSnackBar} close={this.closeSnackBar}>{this.state.msj} </SnackBar>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}
export default Home;