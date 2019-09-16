import React, { Component } from "react";
import { Table, Container, Statistic, Segment, Dropdown } from 'semantic-ui-react';
import _ from 'lodash';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const tableData = [
  { name: 'John', age: 15, gender: 'Male' },
  { name: 'Amber', age: 40, gender: 'Female' },
  { name: 'Leslie', age: 25, gender: 'Other' },
  { name: 'Ben', age: 70, gender: 'Male' },
]


class Liquidaciones extends Component {

  state = {
    column: null,
    data: tableData,
    direction: null,

    liquidaciones: [],

    movementsExistence: false,
    errorMessage: null,
  };

  handleChangeStartDate = date => {
    this.setState({
      startDate: date

    });
  };

  handleChangeEndDate = date => {
    this.setState({
      endDate: date

    });
  };

  handleSort = (clickedColumn) => () => {
    const { column, data, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  };

  handleChange = (e, { value }) => {
    //aca va el fetch para traer las liquidaciones
    let requestBody = {};
    requestBody.dni = this.props.cli[0]['dni'];
    requestBody.mes = value;
    fetch('/movimientos/obtener', {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    })
      .then(response => {
        if (response.status === 200) {
          this.setState({ movementsExistence: true })
          return response.json();
        }
        else {
          this.setState({ movementsExistence: false})
          return response.json();
        }
      })
      .then(
        (result) => {
          this.state.movementsExistence
            ? this.setState({ liquidaciones: JSON.parse(result) })
            : this.setState({ errorMessage: result })
        })
  }

  render() {
    const { column, data, direction } = this.state;
    const options = [
      { key: 1, text: 'Enero', value: 1 },
      { key: 2, text: 'Febrero', value: 2 },
      { key: 3, text: 'Marzo', value: 3 },
      { key: 4, text: 'Abril', value: 4 },
      { key: 5, text: 'Mayo', value: 5 },
      { key: 6, text: 'Junio', value: 6 },
      { key: 7, text: 'Julio', value: 7 },
      { key: 8, text: 'Agosto', value: 8 },
      { key: 9, text: 'Septiembre', value: 9 },
      { key: 10, text: 'Octubre', value: 10 },
      { key: 11, text: 'Noviembre', value: 11 },
      { key: 12, text: 'Diciembre', value: 12 },
    ]

      return (
        <Container>
          <Segment>
            <Statistic.Group>
              <Statistic>
                <Statistic.Value>22</Statistic.Value>
                <Statistic.Label>cant meses</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>31,200</Statistic.Value>
                <Statistic.Label>gasto anual</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>22</Statistic.Value>
                <Statistic.Label>otro</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Segment>

          <Segment>
            <Dropdown clearable options={options} selection onChange={this.handleChange} />
          </Segment>

          {!this.state.statusMovements
          ? this.state.errorMessage
          : <Segment>
              <Table sortable celled fixed>
                  <Table.Header>
                  <Table.Row>
                      <Table.HeaderCell
                      sorted={column === 'name' ? direction : null}
                      onClick={this.handleSort('name')}
                      >
                      Name
                      </Table.HeaderCell>
                      <Table.HeaderCell
                      sorted={column === 'age' ? direction : null}
                      onClick={this.handleSort('age')}
                      >
                      Age
                      </Table.HeaderCell>
                      <Table.HeaderCell
                      sorted={column === 'gender' ? direction : null}
                      onClick={this.handleSort('gender')}
                      >
                      Gender
                      </Table.HeaderCell>
                  </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {_.map(data, ({ age, gender, name }) => (
                        <Table.Row key={name}>
                        <Table.Cell>{name}</Table.Cell>
                        <Table.Cell>{age}</Table.Cell>
                        <Table.Cell>{gender}</Table.Cell>
                    </Table.Row>
                    ))}
                    </Table.Body>
                    </Table>}
            </Segment>
          }
          
        </Container>


      );
  }

}

export default Liquidaciones