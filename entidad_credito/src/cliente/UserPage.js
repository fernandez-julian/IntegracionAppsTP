import React, { Component } from "react";
import ModalUser from './ModalUser';
import NavBarCli from './NavBarCli';
import InicioCli from './InicioCli';
import Liquidaciones from './Liquidaciones';
import { BrowserRouter as Router, Route } from "react-router-dom";

class UserPage extends Component {
    state = {
        openModalUsr: false
    };

    handleOpenModalUsr = () =>{
        this.setState({ openModalUsr: true });
    };

    handleCloseModalUsr = () => {
        this.setState({ openModalUsr: false });
    }

    handleLogOut = () =>{
        this.props.logOut();
    };

    render() {
        return (
            <div>
                <Router>
                    <NavBarCli OpenModalUsr={this.handleOpenModalUsr} LogOut={this.handleLogOut}/>
                    <Route path="/Inicio" component={InicioCli} />
                    <Route path="/Liquidaciones" component={Liquidaciones} />
                </Router>


                <ModalUser open={this.state.openModalUsr} close={this.handleCloseModalUsr}/>

            </div>
            )
    }
}

export default UserPage