import _ from 'lodash'
import faker from 'faker'
import React, { Component } from 'react'
import { Grid, Header, Segment, Container, Table, Input, Button, } from 'semantic-ui-react'


export default class SearchEstablecimientos extends Component {

  state = {
    error: null,
    isLoaded: false,
    establecimientos: [],

    isLoading: false,
    results: [],
    value: '',
  };

  componentDidMount() {
    fetch('/entidades/obtener')
      .then(response => response.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            establecimientos: JSON.parse(result),
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
                placeholder='Buscar por razón social'
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <Segment>
                <Header>Establecimientos registrados</Header>
                <Table color={'olive'} celled selectable>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Razón Social</Table.HeaderCell>
                      <Table.HeaderCell>Direccion</Table.HeaderCell>
                      <Table.HeaderCell>Telefono</Table.HeaderCell>
                      <Table.HeaderCell/>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>

                    {results.map(item => (
                      <Table.Row>
                        <Table.Cell>{item.razonSocial}</Table.Cell>
                        <Table.Cell>{item.direccion}</Table.Cell>
                        <Table.Cell>{item.telefono}</Table.Cell>
                        <Table.Cell textAlign='center'><Button color='red' icon='trash alternate outline'/></Table.Cell>
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