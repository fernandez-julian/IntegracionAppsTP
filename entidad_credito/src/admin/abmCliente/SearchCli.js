import _ from 'lodash'
import React, { Component } from 'react'
import { Grid, Header, Segment, Container, Table, Input, Button, Popup, Confirm } from 'semantic-ui-react'

export default class SearchCli extends Component {

  state = {
    error: null,
    isLoaded: false,
    clientes: [],

    customerExistence: null,
    errorMessageExistence: null,
    isLoading: false,
    results: [],
    value: '',

    openConfirm: false,
    toDelete: null,
  };

  componentDidMount() {
    let urlConsulta = `${"https://tarjetacredito.azurewebsites.net"}/clientes/obtener`;
    fetch(urlConsulta)
      .then(response => {
        if (response.status === 200) {
          this.setState({ customerExistence: true })
          return response.json();
        }
        else {
          this.setState({ customerExistence: false })
          return response.json();
        }
      })
      .then(
        (result) => {
          this.state.customerExistence
            ? this.setState({
              isLoaded: true,
              clientes: JSON.parse(result),
              results: JSON.parse(result),
            })
            : this.setState({ errorMessageExistence: result })
        }
      )
  };

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.mail });
  };

  handleResultSelect = (e, { result }) => this.setState({ value: result.mail })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState({ isLoading: false, results: this.state.clientes, value: '' });

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.mail)

      this.setState({
        isLoading: false,
        results: _.filter(this.state.clientes, isMatch),
      })
    }, 300)
  }

  handleDelete = (item) => {
    item = this.state.toDelete;
    function found(element) {
      return element.dni === item.dni;
    }
    var indexDelete = this.state.clientes.findIndex(found);
    this.state.clientes.splice(indexDelete, 1);

    let requestBody = {};
    requestBody.dni = item.dni;
    let urlConsulta = `${"https://tarjetacredito.azurewebsites.net"}/clientes/eliminar`;
    fetch(urlConsulta, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    })
      .then(this.setState({ results: this.state.clientes, openConfirm: false, toDelete: null }));
  };

  openConfirm = (item) => {
    this.setState({ toDelete: item, openConfirm: true });
  };

  closeConfirm = () => {
    this.setState({ openConfirm: false, toDelete: null });

  };

  render() {
    const { errorMessageExistence, isLoaded, isLoading, value, results } = this.state;
    if (errorMessageExistence) {
      return <div>{errorMessageExistence}</div>;
    } else if (!isLoaded) {
      return <div> Cargando ... </div>;
    } else {
      return (
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={4}>
                <Input
                  loading={isLoading}
                  icon={isLoading ? '' : 'search'}
                  onChange={_.debounce(this.handleSearchChange, 500, {
                    leading: true,
                  })}
                  value={value}
                  placeholder='Buscar por mail'
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Header>Clientes registrados</Header>
                  <Table color={'olive'} celled selectable>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Nombre</Table.HeaderCell>
                        <Table.HeaderCell>Contraseña</Table.HeaderCell>
                        <Table.HeaderCell>Fecha Nacimiento</Table.HeaderCell>
                        <Table.HeaderCell>DNI</Table.HeaderCell>
                        <Table.HeaderCell>Telefono</Table.HeaderCell>
                        <Table.HeaderCell>Mail</Table.HeaderCell>
                        <Table.HeaderCell>Clave Bancaria Unica</Table.HeaderCell>
                        <Table.HeaderCell />
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>

                      {results.map(item => (
                        <Table.Row>
                          <Table.Cell>{item.nombre}</Table.Cell>
                          <Table.Cell>{item.passPropia}</Table.Cell>
                          <Table.Cell>{item.fechaNac}</Table.Cell>
                          <Table.Cell>{item.dni}</Table.Cell>
                          <Table.Cell>{item.telefono}</Table.Cell>
                          <Table.Cell>{item.mail}</Table.Cell>
                          <Table.Cell>{item.cbu}</Table.Cell>
                          <Table.Cell textAlign='center'>
                            <Popup
                              content='Eliminar'
                              trigger={<Button color='red' icon='trash alternate outline' size='mini'
                                onClick={() => this.openConfirm(item)} />}
                            /></Table.Cell>
                        </Table.Row>
                      ))}

                    </Table.Body>
                  </Table>
                </Segment>
              </Grid.Column>
            </Grid.Row>


          </Grid>
          <Confirm
            open={this.state.openConfirm}
            onCancel={this.closeConfirm}
            onConfirm={this.handleDelete}
            content='¿Desea confirmar la baja del cliente?'
            cancelButton='Cancelar'
            confirmButton="Confirmar"
          />
        </Container>
      );
    };
  };
};