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
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      successText: '',
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    let requestBody = {};
    requestBody.email = this.state.email;
    requestBody.password = this.state.password;
    fetch('/log', {
      method: "POST",
      mode: 'cors',
      body: JSON.stringify(requestBody),
      headers: new Headers({
        'Content-Type': 'application/json'
        }),
        }).then(response => { return response.json() })
        .then(response => {
        var a = JSON.parse(response)//------------------------problemas con Json, no puedo rescatar el valor de campo'tipo'
          console.log();
          
          
        if(response.tipo==='admin'){
          this.props.isAdmin();
          this.props.logIn();
        }
        if(response.tipo==='cliente'){
          this.props.isCli();
          this.props.logIn();
        }
    });
  };

  render() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
      };

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
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Dirección de E-mail"
                  name='email'
                  onChange={this.handleChange}
                  placeholder="Dirección de E-mail" required
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Contraseña" required
                  type="password"
                  name='password'
                  onChange={this.handleChange}
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
  