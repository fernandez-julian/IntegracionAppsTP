import _ from 'lodash'
import React, { Component } from 'react'
import { Grid, Header, Segment, Container, Table, Input, Button, Popup, Confirm } from 'semantic-ui-react'
import ModalEdit from '../../components/ModalEditEstablecimiento'


export default class SearchEstablecimientos extends Component {

  state = {
    error: null,
    isLoaded: false,
    establecimientos: [],

    isLoading: false,
    results: [],
    value: '',

    edit: '',

    modalEdit: false,

    successEdit: false,
    entidadesExistence: false,
    errorMessageExistence: null,

    openConfirm: false,
    toDelete: null,
  };

  componentDidMount() {
    let urlConsulta = `${"http://tarjetaback.herokuapp.com"}/entidades/obtener`;
    fetch(urlConsulta)
      .then(response => {
        if (response.status === 200) {
          this.setState({ entidadesExistence: true })
          return response.json();
        }
        else {
          this.setState({ entidadesExistence: false })
          return response.json();
        }
      })
      .then(
        (result) => {
          this.state.entidadesExistence
            ? this.setState({
              isLoaded: true,
              establecimientos: JSON.parse(result),
              results: JSON.parse(result),
            })
            : this.setState({ errorMessageExistence: result })
        })
  }

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.razonSocial });
  };

  handleResultSelect = (e, { result }) => this.setState({ value: result.razonSocial })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1)//cuando el input de search esta vacio
        return this.setState({ isLoading: false, results: this.state.establecimientos, value: '' });

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = (result) => re.test(result.razonSocial);

      this.setState({
        isLoading: false,
        results: _.filter(this.state.establecimientos, isMatch),
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

  editEstablecimiento = (newDir, newTel, id) => {
    this.setState(state => {
      const establecimientos = state.establecimientos.map((item, i) => {
        if (item.idEntidad === id) {
          var newItem = item;
          if (newDir.length > 0)
            newItem.direccion = newDir;
          if (newTel.length > 0)
            newItem.telefono = newTel;
          return newItem;
        }
        else {
          return item;
        }
      });
      return { establecimientos };
    })
    let requestBody = {};
    requestBody.idEntidad = id;
    if (newDir.length > 0) {
      requestBody.direccion = newDir;
    } else {
      requestBody.direccion = null;
    }
    if (newTel.length > 0) {
      requestBody.telefono = newTel;
    } else {
      requestBody.telefono = null;
    }
    let urlConsulta = `${"http://tarjetaback.herokuapp.com"}/entidades/actualizar`;
    fetch(urlConsulta, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    }).then(response => {
      response.status === 200 ? this.setState({ successEdit: true }) : this.setState({ successEdit: false })/*'ocurrio un error'*/
    }).then(this.setState({ results: this.state.establecimientos }));
  };

  handleDelete = (item) => {
    item = this.state.toDelete;
    function found(element) {
      return element.idEntidad === item.idEntidad;
    }
    var indexDelete = this.state.establecimientos.findIndex(found);
    this.state.establecimientos.splice(indexDelete, 1);

    let requestBody = {};
    requestBody.idEntidad = item.idEntidad;
    let urlConsulta = `${"http://tarjetaback.herokuapp.com"}/entidades/eliminar`;
    fetch(urlConsulta, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    }).then(this.setState({ results: this.state.establecimientos, openConfirm: false, toDelete: null }));
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
                  placeholder='Buscar por razón social'
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Header>Establecimientos registrados</Header>
                  <Table color={'olive'} celled selectable>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Razón Social</Table.HeaderCell>
                        <Table.HeaderCell>Direccion</Table.HeaderCell>
                        <Table.HeaderCell>Telefono</Table.HeaderCell>
                        <Table.HeaderCell>Clave Bancaria Unica</Table.HeaderCell>
                        <Table.HeaderCell />
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>

                      {results.map(item => (
                        <Table.Row key={item.idEntidad}>
                          <Table.Cell>{item.razonSocial}</Table.Cell>
                          <Table.Cell>{item.direccion}</Table.Cell>
                          <Table.Cell>{item.telefono}</Table.Cell>
                          <Table.Cell>{item.cbu}</Table.Cell>
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
            editEstablecimiento={this.editEstablecimiento}
            successEdit={this.state.successEdit}
          />

          <Confirm
            open={this.state.openConfirm}
            onCancel={this.closeConfirm}
            onConfirm={this.handleDelete}
            content='¿Desea confirmar la baja del establecimiento?'
            cancelButton='Cancelar'
            confirmButton="Confirmar"
          />
        </Container>
      );
    };
  };
};