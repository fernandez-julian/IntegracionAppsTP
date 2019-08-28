import React, { Component } from "react";
import NavBarAdmin from './NavBarAdmin';
import FormCli from './abmCliente/FormCli';
import SearchCli from './abmCliente/SearchCli';
import { BrowserRouter as Router, Route } from "react-router-dom";

class AdminPage extends Component {
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
                    <NavBarAdmin OpenModalUsr={this.handleOpenModalUsr} LogOut={this.handleLogOut}/>
                    <Route path="/FormCli" component={FormCli}/>
                    <Route path="/SearchCli" component={SearchCli}/>
                    {/*<Route path="/Inicio" component={InicioCli} />
                    <Route path="/Liquidaciones" component={Liquidaciones} />
        */}
                </Router>


               {/* <ModalUser open={this.state.openModalUsr} close={this.handleCloseModalUsr}/>
               */}

            </div>
            )
    }
}

export default AdminPage