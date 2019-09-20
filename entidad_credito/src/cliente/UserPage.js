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

        cli: this.props.cli,
    };

    handleOpenModalUsr = () => {
        this.setState({ openModalUsr: true });
    };

    handleCloseModalUsr = () => {
        this.setState({ openModalUsr: false });
    };

    handleOpenModalChangePass = () => {
        this.setState({ openChangePass: true });
    };

    handleCloseModalChangePass = () => {
        this.setState({ openChangePass: false });
    };

    handleLogOut = () => {
        this.props.logOut();
    };

    render() {
        return (
            <div>
                <Router>
                    <NavBarCli OpenModalUsr={this.handleOpenModalUsr} LogOut={this.handleLogOut}
                        openChangePass={this.handleOpenModalChangePass} />
                    <Greeting name={this.state.cli[0]['nombre']} />

                    <Route path="/Inicio" render={() => <InicioCli cli={this.state.cli}/>} />
                    <Route path="/Liquidaciones" render={() => <Liquidaciones cli={this.state.cli}/>}/>

                    <ModalUser open={this.state.openModalUsr} close={this.handleCloseModalUsr} usr={this.state.cli} />
                    <ChangePass open={this.state.openChangePass} close={this.handleCloseModalChangePass}
                    usrEmail ={this.state.cli[0]['mail']} currentPass={this.state.cli[0]['passPropia']}/>
                </Router>



            </div>
        )
    }
}

export default UserPage