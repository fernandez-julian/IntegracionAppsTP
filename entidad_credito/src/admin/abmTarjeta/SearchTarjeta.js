import _ from 'lodash'
import faker from 'faker'
import React, { Component } from 'react'
import { Search, Grid, Header, Segment, Container, Table, Input, Button, Popup, Confirm } from 'semantic-ui-react'
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
    fetch('/tarjetas/obtener')
    .then(response => {
      if (response.status === 200) {
        this.setState({ cardExistence: true })
        return response.json();
      }
      else {
        this.setState({ cardExistence: false})
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
          : this.setState({ errorMessageExistence: result})
        })
  }

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.nroTarjeta });
  };

  handleResultSelect = (e, { result }) => this.setState({ value: result.nroTarjeta })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1)//cuando el input de search esta vacio
        return this.setState({ isLoading: false, results: this.state.tarjetas, value: '' });

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = (result) => re.test(result.nroTarjeta);

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

    fetch('/tarjetas/actualizar', {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    }).then(response => {
      response.status === 200 ? this.setState({ successEdit: true }) : this.setState({ successEdit: false })/*'ocurrio un error'*/
    }).then(this.setState({ results: this.state.tarjetas }));
  };

  handleDelete = (item) => {//  completar!!!!!!!!!!!
    //Falta ver como eliminar el item del array
    console.log(this.state.tarjetas)
    /*let requestBody = {};
    requestBody.idEntidad = item.idEntidad;
    fetch('/entidades/eliminar', {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    }).then(this.setState({ results: this.state.establecimientos }));
  };*/
};

openConfirm = (item) => {
  this.setState({toDelete: item, openConfirm: true});
};

closeConfirm = () => {
  this.setState({openConfirm: false, toDelete: null});

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
            <Grid.Column width={6}>
              <Input
                loading={isLoading}
                icon={isLoading ? '' : 'search'}
                onChange={_.debounce(this.handleSearchChange, 500, {
                  leading: true,
                })}
                value={value}
                placeholder='Buscar por nro tarjeta'
              />
            </Grid.Column>
            <Grid.Column width={10}>
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