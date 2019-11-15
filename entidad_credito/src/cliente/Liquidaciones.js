import React, { Component } from "react";
import { Table, Container, Statistic, Segment, Dropdown, Icon } from 'semantic-ui-react';
import _ from 'lodash';
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

    isLoaded: true,
    liquidaciones: [],
    subtotal: null,
    intereses: null,
    total: null,
    errorMessageExistence: null,

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
    const { column, liquidaciones, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        liquidaciones: _.sortBy(liquidaciones, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      liquidaciones: liquidaciones.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  };

  handleChange = (e, { value }) => {
    if (value !== '') {
      this.setState({ isLoaded: false, errorMessageExistence: null })
      let requestBody = {};
      requestBody.dni = this.props.cli[0]['dni'];
      requestBody.mes = value;
      let urlConsulta = `${"http://tarjetaback.herokuapp.com"}/movimientos/obtener`;
      fetch(urlConsulta, {
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
            this.setState({ movementsExistence: false })
            return response.json();
          }
        })
        .then(
          (result) => {
            if (this.state.movementsExistence) {
              var obj = JSON.parse(result);
              var subtotal = obj[obj.length - 3];
              var intereses = obj[obj.length - 2];
              var total = obj[obj.length - 1];
              obj.splice(obj.length - 3, 3);
              this.setState({ isLoaded: true, liquidaciones: obj, subtotal: subtotal['subtotal'], intereses: intereses['intereses'], total: total['total'] })
            } else {
              this.setState({ errorMessageExistence: result, subtotal: null, intereses: null, total: null, liquidaciones: [] })
            }
          })
    }
  }

  render() {
    const { column, direction, liquidaciones, errorMessageExistence, isLoaded, subtotal, intereses, total } = this.state;
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
              <Statistic.Value>{liquidaciones.length}</Statistic.Value>
              <Statistic.Label>Movimientos</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value><Icon name='dollar sign' />{subtotal}</Statistic.Value>
              <Statistic.Label>SUBTOTAL</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value><Icon name='dollar sign' />{intereses}</Statistic.Value>
              <Statistic.Label>INTERESES</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value><Icon name='dollar sign' />{total}</Statistic.Value>
              <Statistic.Label>TOTAL</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </Segment>

        <Segment>
          <Dropdown clearable options={options} selection onChange={this.handleChange} />
        </Segment>

        {
          errorMessageExistence
            ? <div>{errorMessageExistence}</div>
            : !isLoaded
              ? <div> Cargando ... </div>
              : <Segment>
                <Table sortable celled fixed>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell
                        sorted={column === 'fecha' ? direction : null}
                        onClick={this.handleSort('fecha')}
                      >
                        Fecha
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        sorted={column === 'razonSocial' ? direction : null}
                        onClick={this.handleSort('razonSocial')}
                      >
                        Razon social
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        sorted={column === 'monto' ? direction : null}
                        onClick={this.handleSort('monto')}
                      >
                        Monto
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        sorted={column === 'cuota' ? direction : null}
                        onClick={this.handleSort('cuota')}
                      >
                        Cuota
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {liquidaciones.map(item => (
                      <Table.Row>
                        <Table.Cell>{item.fechaPago}</Table.Cell>
                        <Table.Cell>{item.razonSocial}</Table.Cell>
                        <Table.Cell>$ {item.monto}</Table.Cell>
                        <Table.Cell>{item.nroCuota}/{item.totalCuota}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </Segment>
        }

      </Container>


    );
  }
}


export default Liquidaciones