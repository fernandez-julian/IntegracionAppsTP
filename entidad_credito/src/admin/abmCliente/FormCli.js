import React, { Component } from "react";
import { Form, Input, TextArea, Button, Select, Container, Header, Icon, Segment, Message } from 'semantic-ui-react'

const genderOptions = [
  { key: 'h', text: 'Hombre', value: 'Hombre' },
  { key: 'm', text: 'Mujer', value: 'Mujer' },
  { key: 'o', text: 'Otro', value: 'Otro' },
]

class FromCli extends Component {
    render(){
        return(
            <Container>
                <Segment style={{marginTop:'60px'}}>
                    <Header as='h2' icon textAlign='center' >
                    <Icon name='users' circular />
                    <Header.Content>Altas clientes</Header.Content>
                    </Header>
                </Segment>
                <Segment>
                    <Form>
                        <Form.Group widths='equal'>
                        <Form.Field
                            id='form-input-control-first-name'
                            control={Input}
                            label='Nombre'
                            placeholder='Nombre'
                        />
                        <Form.Field
                            id='form-input-control-last-name'
                            control={Input}
                            label='Apellido'
                            placeholder='Apellido'
                        />
                        <Form.Field
                            control={Select}
                            options={genderOptions}
                            label={{ children: 'Genero', htmlFor: 'form-select-control-gender' }}
                            placeholder='Genero'
                            search
                            searchInput={{ id: 'form-select-control-gender' }}
                        />
                        </Form.Group>
                        <Form.Field
                        id='form-textarea-control-opinion'
                        control={TextArea}
                        label='Opinion'
                        placeholder='Opinion'
                        />
                    {/* <Form.Field
                        id='form-button-control-public'
                        control={Button}
                        content='Confirm'
                        label='Label with htmlFor'
                    />*/}
                    <Button.Group>
                        <Button>Cancelar</Button>
                        <Button.Or />
                        <Button positive>Aceptar</Button>
                    </Button.Group>
                    </Form>
                </Segment>
                <Message
                success
                header='Form Completed'
                content="You're all signed up for the newsletter"
                size='big'
                
                />
            </Container>
            
        );
    }
}

export default FromCli
