import React, { Component } from 'react';
import { Message, Icon } from 'semantic-ui-react';


class Snackbar extends Component {

  render() {
    const { error, info, success, children } = this.props;
    return this.props.open ? (
      <Message info={info} error={error} success={success} size='big'>
        <Icon name={success ? "check circle" : error ? "times circle" : info ? "info circle" : null} />
        <b>{success ? "Registro completado con exito! " : error ? "Uups ocurrio un problema! " : info ? "Heads Up! " : null}</b>
        <span>{children}</span>
        <Icon name="times" style={{ float: 'right', cursor: 'pointer' }} onClick={() => this.props.close()} />
      </Message>
    ) : null;
  }
}



export default Snackbar;