import React, { Component } from "react";
import ModalUser from './ModalUser';
import NavBarCli from './NavBarCli';
import InicioCli from './InicioCli';
import Liquidaciones from './Liquidaciones';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ChangePass from "./ChangePass";
import Greeting from '../components/Greeting';

class UserPage extends Component {
    state = {
        openModalUsr: false,
        openChangePass: false,
        cliName: this.props.name,
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
                    <NavBarCli OpenModalUsr={this.handleOpenModalUsr} LogOut={this.handleLogOut}
                    openChangePass={this.handleOpenModalChangePass}/>
                    <Greeting name={this.state.cliName}/>

                    <Route path="/Inicio" component={InicioCli} />
                    <Route path="/Liquidaciones" component={Liquidaciones} />

                    <ModalUser open={this.state.openModalUsr} close={this.handleCloseModalUsr}/>
                    <ChangePass open={this.state.openChangePass} close={this.handleCloseModalChangePass}/>
                </Router>



            </div>
            )
    }
}

export default UserPage