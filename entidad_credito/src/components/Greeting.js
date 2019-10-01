import React, { Component } from 'react'
import Lottie from 'react-lottie'
import animationData from './hello.json';
import {
  TransitionablePortal,
  Modal,
} from 'semantic-ui-react'

export default class Greeting extends Component {
  state = { open: false }

  componentDidMount() {
    this.setState({ open: true });
    setTimeout(() => this.setState({ open: false }), 2000);
  }

  handleClose = () => this.setState({ open: false })

  render() {
    

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
    };

    return (
      <TransitionablePortal
        closeOnTriggerClick
        onOpen={this.handleOpen}
        onClose={this.handleClose}
        openOnTriggerClick
        open={this.state.open}
      >

        <Modal open='true' basic size='small' dimmer='blurring'>
          <Modal.Content>

            <h1>
              <Lottie
                options={defaultOptions}
                height={150}
                width={150}
              />
              ¡ Bienvenido {this.props.name} !
      </h1>
          </Modal.Content>
        </Modal>

        {/*
         <Segment circular inverted color='olive' size='big'
          style={{ left: '40%', position: 'fixed', top: '50%', zIndex: 1000 }}
        >
          <p>Bienvenido...</p>
        </Segment>
          */}
      </TransitionablePortal>
    )
  }
}