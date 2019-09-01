import React, { Component } from "react";
import NavBarAdmin from './NavBarAdmin';
import FormCli from './abmCliente/FormCli';
import SearchCli from './abmCliente/SearchCli';
import SearchEstablecimientos from './abmEstablecimiento/SearchEstablecimientos';
import SearchTarjeta from './abmTarjeta/SearchTarjeta';
import FormTarjeta from './abmTarjeta/FormTarjeta';
import FormEstablecimiento from './abmEstablecimiento/FormEstablecimiento';
import Greeting from '../components/Greeting';
import { BrowserRouter as Router, Route } from "react-router-dom";

class AdminPage extends Component {
    state = {
        openModalUsr: false,
        adminName: this.props.name,
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
;

    render() {
        return (
            <div>
                <Router>
                    <NavBarAdmin OpenModalUsr={this.handleOpenModalUsr} LogOut={this.handleLogOut}/>
                    <Greeting name={this.state.adminName}/>
                    <Route path="/FormCli" component={FormCli}/>
                    <Route path="/SearchCli" component={SearchCli}/>
                    <Route path="/SearchTarjeta" component={SearchTarjeta}/>
                    <Route path="/SearchEstablecimientos" component={SearchEstablecimientos}/>
                    <Route path="/FormTarjeta" component={FormTarjeta}/>
                    <Route path="/FormEstablecimiento" component={FormEstablecimiento}/>
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