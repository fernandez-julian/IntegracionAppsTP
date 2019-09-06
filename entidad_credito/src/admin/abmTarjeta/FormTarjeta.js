import React, { Component } from "react";
import { Form, Input, TextArea, Button, Select, Container, Header, Icon, Segment, Message, Confirm } from 'semantic-ui-react';
import SnackBar from '../../components/SnackBar';



class FromTarjeta extends Component {

    state = {
        openConfirm: false,
        openSnackBar: false,
    };

  openConfirm = () => this.setState({ openConfirm: true });

  closeConfirm = () => this.setState({ openConfirm: false });

  
  handleConfirm = () => {
    this.closeConfirm();
    this.setState({ openSnackBar: true });
    setTimeout(() => this.setState({ openSnackBar: false }), 3000);
};

    render(){
        
        return(
            <Container>
                <Segment style={{marginTop:'60px'}}>
                    <Header as='h2' icon textAlign='center' >
                    <Icon name='address card icon' circular/>
                    <Header.Content>Alta tarjeta</Header.Content>
                    </Header>
                </Segment>
                <Segment>
                    <Form>
                        <Form.Group widths='equal'>
                        <Form.Field
                            id='form-input-control-DNI'
                            control={Input}
                            label='DNI del Cliente'
                            placeholder='DNI del Cliente'
                        />
                        </Form.Group>
                       {/* <Form.Field
                        id='form-textarea-control-opinion'
                        control={TextArea}
                        label='Opinion'
                        placeholder='Opinion'
                        />
                        <Form.Field
                        id='form-button-control-public'
                        control={Button}
                        content='Confirm'
                        label='Label with htmlFor'
                    />*/}
                    <Button.Group>
                        <Button>Cancelar</Button>
                        <Button.Or />
                        <Button positive onClick={this.openConfirm}>Aceptar</Button>
                    </Button.Group>
                    </Form>
                </Segment>

                <Confirm
                open={this.state.openConfirm}
                onCancel={this.closeConfirm}
                onConfirm={this.handleConfirm}
                content='¿Desea confirmar el alta de la tarjeta?'
                cancelButton='Cancelar'
                confirmButton="Confirmar"
                /> 

               
                <SnackBar success open={this.state.openSnackBar}/>{/*________________________NO SE RENDERIZA____________ */}
                

            </Container>
        );
    }
}

export default FromTarjeta
