import _ from 'lodash'
import faker from 'faker'
import React, { Component } from 'react'
import { Search, Grid, Header, Segment, Container, Table } from 'semantic-ui-react'

const initialState = { isLoading: false, results: [], value: '' }

const source = _.times(5, () => ({
  title: faker.company.companyName(),
  description: faker.company.catchPhrase(),
  image: faker.internet.avatar(),
  price: faker.finance.amount(0, 100, 2, '$'),
}))

export default class SearchExampleStandard extends Component {

  state = {
    error: null,
    isLoaded: false,
    establecimientos: [],
  };

  componentDidMount() {
    fetch('/entidades/obtener')
      .then(response => response.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            establecimientos: JSON.parse(result),
          });
          console.log(this.state.establecimientos)
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  };

  render() {
    const { error, isLoaded, establecimientos } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div> Cargando ... </div>;
    } else {
      return (
        <Container>
          <Grid>
            <Grid.Column width={6}>
              <Search
                /*loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                  leading: true,
                })}
                results={results}
                value={value}
                {...this.props}
                placeholder='Buscar'*/
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <Segment>
                <Header>Establecimientos registrados</Header>
                <Table color={'olive'}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Establecimiento</Table.HeaderCell>
                      <Table.HeaderCell>Direccion</Table.HeaderCell>
                      <Table.HeaderCell>Telefono</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>

                    {establecimientos.map(item => (
                      <Table.Row>
                        <Table.Cell>{item.razonSocial}</Table.Cell>
                        <Table.Cell>{item.direccion}</Table.Cell>
                        <Table.Cell>{item.telefono}</Table.Cell>
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


{/*
  state = initialState

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 300)
  }

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
*/}