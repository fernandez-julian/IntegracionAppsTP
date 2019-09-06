import React from 'react';
import Home from './Home';
import UserPage from '../cliente/UserPage';
import AdminPage from '../admin/AdminPage';

class App extends React.Component {//
  /*Verrificar logIn
  /*If -> logueado o no logueado
  /*Si cumple -> mostrar correspondiente pagina
  */
  state = {
    usr: [],
    loggedIn: false,
    admin: false,
    cli: false
  };

  setUsr = (usr) => {
    this.setState({ usr });

    if (usr.length)
      this.setState({ loggedIn: true });

    if (usr[0]['tipo'] === 'admin')
      this.setState({ admin: true });

    if (usr[0]['tipo'] === 'cliente')
      this.setState({ cli: true });

  }

  logOut = () => {
    this.setState({ loggedIn: false });
    this.setState({ admin: false });
    this.setState({ cli: false });
    this.setState({ usr: [] });
  }

  render = () => {
    if (this.state.loggedIn) {
      if (this.state.cli) {
        return (<UserPage cli={this.state.usr} logOut={this.logOut} />);//mando todos los datos del cliente
      }
      else {
        return (<AdminPage name={this.state.usr[0]['nombre']} logOut={this.logOut} />);//mando solo el nombre del administrador
      }
    }
    else {
      return (
        <Home setUsr={this.setUsr} />
      );
    }
  }
}

export default App;
