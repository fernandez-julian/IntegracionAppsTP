import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home';

class App extends React.Component {//
/*Verrificar logIn
/*If -> logueado o no logueado
/*Si cumple -> mostrar correspondiente pagina
*/
  render = () => {
      return (
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
        </Router>
      );
  }
}

export default App;
