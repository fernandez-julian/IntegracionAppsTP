import React, { Component } from "react";
import ModalUser from './ModalUser';
import NavBarCli from './NavBarCli';
import InicioCli from './InicioCli';
import Liquidaciones from './Liquidaciones';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ChangePass from "./ChangePass";

class UserPage extends Component {
    state = {
        openModalUsr: false,
        openChangePass: true,
    };

    handleOpenModalUsr = () =>{
        this.setState({ openModalUsr: true });
    };

    handleCloseModalUsr = () => {
        this.setState({ openModalUsr: false });
    };

    handleOpenModalChangePass = () =>{
        this.setState({ openChangePass: true });
    };

    handleCloseModalChangePass = () =>{
        this.setState({ openChangePass: false });
    };

    handleLogOut = () =>{
        this.props.logOut();
    };

    render() {
        return (
            <div>
                <Router>
                    <NavBarCli OpenModalUsr={this.handleOpenModalUsr} LogOut={this.handleLogOut} openChangePass={this.handleOpenModalChangePass}/>
                    <Route path="/Inicio" component={InicioCli} />
                    <Route path="/Liquidaciones" component={Liquidaciones} />
                </Router>


                <ModalUser open={this.state.openModalUsr} close={this.handleCloseModalUsr}/>
                <ChangePass open={this.state.openChangePass} close={this.handleCloseModalChangePass}/>

            </div>
            )
    }
}

export default UserPage