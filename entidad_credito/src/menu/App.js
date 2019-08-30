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
    loggedIn: true,//momentaneamente cambiar entre true y false para ver la pagina del usr
  };

  logIn = () => {
    this.setState({ loggedIn: true });
  }

  logOut = () =>{
    this.setState({ loggedIn: false });
  }

  render = () => {
    if(this.state.loggedIn){
      return(
        //<EmpleadoPage/>

         <UserPage logOut={this.logOut}/>
         //<AdminPage logOut={this.logOut}/>

        
        
      );
    }
    else{
      return (
        <Home/>
      );
    }
  }
}

export default App;
