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
    loggedIn: false,//momentaneamente cambiar entre true y false para ver la pagina del usr
    admin: false,
    cli: false
  };

  logIn = () => {
    this.setState({ loggedIn: true });
  }

  logOut = () =>{
    this.setState({ loggedIn: false });
  }

  isAdmin = () =>{
    this.setState({ admin: true });
    this.setState({ cli: false });
  }

  isCli = () =>{
    this.setState({ cli: true });
    this.setState({ admin: false });
  }

  render = () => {
    if(this.state.loggedIn){
      if(this.state.cli){
        return(<UserPage logOut={this.logOut}/>);
      }
      else{
        return(<AdminPage logOut={this.logOut}/>);
      }
    }
    else{
      return (
        <Home isAdmin={this.isAdmin} isCli={this.isCli} logIn={this.logIn}/>
      );
    }
  }
}

export default App;
