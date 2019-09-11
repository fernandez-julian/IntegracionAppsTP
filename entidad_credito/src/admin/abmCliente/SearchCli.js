import _ from 'lodash'
import faker from 'faker'
import React, { Component } from 'react'
import { Search, Grid, Header, Segment, Container, Table, Input, Button, } from 'semantic-ui-react'

/*const initialState = { isLoading: false, results: [], value: '' }

const source = _.times(5, () => ({
  title: faker.company.companyName(),
  description: faker.company.catchPhrase(),
  image: faker.internet.avatar(),
  price: faker.finance.amount(0, 100, 2, '$'),
}))*/

export default class SearchCli extends Component {
  //state = initialState

  state = {
    error: null,
    isLoaded: false,
    clientes: [],

    isLoading: false,
    results: [],
    value: '',
  };

  componentDidMount() {
    fetch('/clientes/obtener')
      .then(response => response.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            clientes: JSON.parse(result),
            results: JSON.parse(result),
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  };

  //handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.mail });
  };

  handleResultSelect = (e, { result }) => this.setState({ value: result.mail })

  /*handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })*/

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

  render() {
    const { error, isLoaded, isLoading, value, results } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
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
                placeholder='Buscar por mail'
              />
            </Grid.Column>
            <Grid.Column width={10}>
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

/*
render() {
  const { isLoading, value, results } = this.state

  return (
      <Container>
          <Grid>
              <Grid.Column width={6}>
              <Search
                  loading={isLoading}
                  onResultSelect={this.handleResultSelect}
                  onSearchChange={_.debounce(this.handleSearchChange, 500, {
                  leading: true,
                  })}
                  results={results}
                  value={value}
                  {...this.props}
                  placeholder='Buscar'
              />
              </Grid.Column>
              <Grid.Column width={10}>
              <Segment>
                  <Header>State</Header>
                  <pre style={{ overflowX: 'auto' }}>
                  {JSON.stringify(this.state, null, 2)}
                  </pre>
                  <Header>Options</Header>
                  <pre style={{ overflowX: 'auto' }}>
                  {JSON.stringify(source, null, 2)}
                  </pre>
              </Segment>
              </Grid.Column>
          </Grid>
      </Container>
  )
}
}
*/