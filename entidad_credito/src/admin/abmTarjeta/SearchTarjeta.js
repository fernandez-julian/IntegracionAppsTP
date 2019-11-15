import _ from 'lodash'
import React, { Component } from 'react'
import { Grid, Header, Segment, Container, Table, Input, Button, Popup, Confirm } from 'semantic-ui-react'
import ModalEdit from '../../components/ModalEditTarjeta'

export default class SearchTarjeta extends Component {

  state = {
    errorMessageExistence: null,
    isLoaded: false,
    tarjetas: [],
    cardExistence: null,

    isLoading: false,
    results: [],
    value: '',

    edit: '',

    modalEdit: false,

    successEdit: false,

    openConfirm: false,
    toDelete: null,
  };

  componentDidMount() {
    let urlConsulta = `${"http://tarjetaback.herokuapp.com"}/tarjetas/obtener`;
    fetch(urlConsulta)
      .then(response => {
        if (response.status === 200) {
          this.setState({ cardExistence: true })
          return response.json();
        }
        else {
          this.setState({ cardExistence: false })
          return response.json();
        }
      })
      .then(
        (result) => {
          this.state.cardExistence
            ? this.setState({
              isLoaded: true,
              tarjetas: JSON.parse(result),
              results: JSON.parse(result),
            })
            : this.setState({ errorMessageExistence: result })
        })
  }

  handleResultSelect = (e, { result }) => this.setState({ value: result.dni })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1)//cuando el input de search esta vacio
        return this.setState({ isLoading: false, results: this.state.tarjetas, value: '' });

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = (result) => re.test(result.dni);

      this.setState({
        isLoading: false,
        results: _.filter(this.state.tarjetas, isMatch),
      })
    }, 300)
  }

  openModalEdit = () => {
    this.setState({ modalEdit: true })
  };

  closeModalEdit = () => {
    this.setState({ modalEdit: false });
    this.setState({
      edit: '',
      successEdit: false,
    });
  };

  handleEdit = (item) => {
    this.setState({
      edit: item,
    });
    this.openModalEdit();
  };

  editTarjeta = (newLimite, dni) => {
    this.setState(state => {
      const tarjetas = state.tarjetas.map((item, i) => {
        if (item.dni === dni) {
          var newItem = item;
          if (newLimite.length > 0)
            newItem.limite = newLimite;
          return newItem;
        }
        else {
          return item;
        }
      });
      return { tarjetas };
    })
    let requestBody = {};
    requestBody.dni = dni;
    if (newLimite.length > 0) {
      requestBody.limite = newLimite;
    } else {
      requestBody.limite = null;
    }
    let urlConsulta = `${"https://tarjetacredito.azurewebsites.net"}/tarjetas/actualizar`;
    fetch(urlConsulta, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    }).then(response => {
      response.status === 200 ? this.setState({ successEdit: true }) : this.setState({ successEdit: false })/*'ocurrio un error'*/
    }).then(this.setState({ results: this.state.tarjetas }));
  };

  handleDelete = (item) => {
    item = this.state.toDelete;
    function found(element) {
      return element.nroTarjeta === item.nroTarjeta;
    }
    var indexDelete = this.state.tarjetas.findIndex(found);
    this.state.tarjetas.splice(indexDelete, 1);

    let requestBody = {};
    requestBody.nroTarjeta = item.nroTarjeta;
    let urlConsulta = `${"https://tarjetacredito.azurewebsites.net"}/tarjetas/eliminar`;
    fetch(urlConsulta, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    })
      .then(this.setState({ results: this.state.tarjetas, openConfirm: false, toDelete: null }));
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
                  placeholder='Buscar por dni cliente'
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Header>Tarjetas registradas</Header>
                  <Table color={'olive'} celled selectable>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Numero Tarjeta</Table.HeaderCell>
                        <Table.HeaderCell>Limite</Table.HeaderCell>
                        <Table.HeaderCell>Dinero Gastado</Table.HeaderCell>
                        <Table.HeaderCell>Fecha Vencimiento</Table.HeaderCell>
                        <Table.HeaderCell>Código Seguridad</Table.HeaderCell>
                        <Table.HeaderCell>DNI Asociado</Table.HeaderCell>
                        <Table.HeaderCell />
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>

                      {results.map(item => (
                        <Table.Row>
                          <Table.Cell>{item.nroTarjeta}</Table.Cell>
                          <Table.Cell>{item.limite}</Table.Cell>
                          <Table.Cell>{item.dineroGastado}</Table.Cell>
                          <Table.Cell>{item.fechaVto}</Table.Cell>
                          <Table.Cell>{item.codSeg}</Table.Cell>
                          <Table.Cell>{item.dni}</Table.Cell>
                          <Table.Cell textAlign='center'>
                            <Popup
                              content='Editar'
                              trigger={<Button color='green' icon='edit' size='mini'
                                onClick={() => this.handleEdit(item)} />}
                            />
                            <Popup
                              content='Eliminar'
                              trigger={<Button color='red' icon='trash alternate outline' size='mini'
                                onClick={() => this.openConfirm(item)} />}
                            />
                          </Table.Cell>
                        </Table.Row>
                      ))}

                    </Table.Body>
                  </Table>
                </Segment>
              </Grid.Column>
            </Grid.Row>


          </Grid>
          <ModalEdit
            open={this.state.modalEdit}
            close={this.closeModalEdit}
            item={this.state.edit}
            editTarjeta={this.editTarjeta}
            successEdit={this.state.successEdit}
          />
          <Confirm
            open={this.state.openConfirm}
            onCancel={this.closeConfirm}
            onConfirm={this.handleDelete}
            content='¿Desea confirmar la baja de la tarjeta?'
            cancelButton='Cancelar'
            confirmButton="Confirmar"
          />
        </Container>
      );
    };
  };
};