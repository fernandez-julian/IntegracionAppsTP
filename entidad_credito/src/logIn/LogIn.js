import React, { Component } from "react";
import Lottie from 'react-lottie'
import animationData from './5666-zezinho.json';
import 'semantic-ui-css/semantic.min.css';
import {
  Button,
  Form,
  Grid,
  Header,
  Segment
} from 'semantic-ui-react';

const Style = {
    logIn:{
        backgroundColor: 'white',
    }
    
}

class LogIn extends Component {

  render() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

      //let { classes } = this.props;

    return (
      <div style={Style.logIn}>
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="olive" textAlign="center">
              <Lottie
                options={defaultOptions}
                height={90}
                width={90}
            />
              Ingrese a su cuenta
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Dirección de E-mail"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Contraseña"
                  type="password"
                />
                <Button color="olive" fluid size="large">
                  Log in
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default LogIn;
