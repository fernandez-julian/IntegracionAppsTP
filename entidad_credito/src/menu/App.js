import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home';
import UserPage from '../usr/UserPage';

class App extends React.Component {//
/*Verrificar logIn
/*If -> logueado o no logueado
/*Si cumple -> mostrar correspondiente pagina
*/
  state = {
    loggedIn: false,//momentaneamente cambiar entre true y false para ver la pagina del usr
  };

  logIn = () => {
    this.setState({ loggedIn: true });
  }

  render = () => {
    if(this.state.loggedIn){
      return(
        <UserPage/>
      );
    }
    else{
      return (
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
        </Router>
      );
    }
  }
}

export default App;
