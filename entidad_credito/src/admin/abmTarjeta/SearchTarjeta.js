import _ from 'lodash'
import faker from 'faker'
import React, { Component } from 'react'
import { Search, Grid, Header, Segment, Container, Table, Input, Button, } from 'semantic-ui-react'

export default class SearchTarjeta extends Component {

  state = {
    error: null,
    isLoaded: false,
    tarjetas: [],
    successGetting: '',

    isLoading: false,
    results: [],
    value: '',
  };

  componentDidMount() {
    fetch('/tarjetas/obtener')
      .then(response => {
        if (response.status === 404) {
          if (response.status === 404) {
            this.state.successGetting = '404';
            return response.json();
          }
          else {
            this.state.successGetting = '200';
            return response.json();
          }
        }
      })
      .then(
        (result) => {
          if (this.state.success === '200') {
            this.setState({
              isLoaded: true,
              tarjetas: JSON.parse(result),
              results: JSON.parse(result),
            });
          }
          else {
            this.setState({ error: 'No hay datos registrados' })
          }

        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  };

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


  render() {
    const { error, isLoaded, isLoading, value, results } = this.state;
    if (error) {
      return <div>Error: {error}</div>;
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
                      <Table.HeaderCell>Codigo Seguridad</Table.HeaderCell>
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
                        <Table.Cell textAlign='center'><Button color='red' icon='trash alternate outline' /></Table.Cell>
                      </Table.Row>
                    ))}

                  </Table.Body>
                </Table>
              </Segment>
            </Grid.Column>
          </Grid>
        </Container>
      );
    };
  };
};