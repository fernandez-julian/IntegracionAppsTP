import React, { Component } from 'react';
import { Message, Icon } from 'semantic-ui-react';


class Snackbar extends Component {
 constructor(props) {
    super(props);
    this.state = {
      visible: this.open//this.props.open,
    };
  }

  componentWillUnmount() {
    this.setState({visible: this.props.open})
  }

  componentDidMount() {
    setTimeout(() => this.setState({ visible: false }), 3000);
  }

  render() {
    const { error, info, success, children } = this.props;
    const { visible } = this.state;
    //const visible = this.props.open;
    return visible ? (
      <Message info={info} error={error} success={success} size='big'>
        <Icon name={success ? "check circle" : error ? "times circle" : info ? "info circle" : null} />
        <b>{success ? "Registro completado con exito! " : error ? "Oups ocurrio un problema! " : info ? "Heads Up! " : null}</b>
        <span>{children}</span>
        <Icon name="times" style={{ float: 'right', cursor: 'pointer' }} onClick={() => this.setState({ visible: false })} />
      </Message>
    ) : null;
  }
}



export default Snackbar;