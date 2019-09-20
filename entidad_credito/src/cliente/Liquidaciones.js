import React, { Component } from "react";
import { Table, Container, Statistic, Segment, Dropdown, Icon } from 'semantic-ui-react';
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

    isLoaded: true,
    liquidaciones: [],
    montoTotalMes:null,
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
    if(value !== ''){
    this.setState({isLoaded: false, errorMessageExistence: null})
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
          this.setState({ movementsExistence: false })
          return response.json();
        }
      })
      .then(
        (result) => {
          if(this.state.movementsExistence){
            var obj = JSON.parse(result);
            var montoMes = obj[obj.length-1];
            var liq = obj.splice(obj.length-1, 1);
          
            this.setState({ isLoaded: true, liquidaciones: obj, montoTotalMes: montoMes['montoTotal'] })
          }else{
            this.setState({ errorMessageExistence: result, montoTotalMes:null, liquidaciones: [] })
          }
            console.log(this.state.liquidaciones)
            console.log(this.state.montoTotalMes)
        })
      }
  }

  render() {
    const { column, direction, liquidaciones, errorMessageExistence, isLoaded, montoTotalMes } = this.state;
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
                <Statistic.Value><Icon name='dollar sign'/>{montoTotalMes}</Statistic.Value>
                <Statistic.Label>LIQUIDADO</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Segment>

          <Segment>
            <Dropdown clearable options={options} selection onChange={this.handleChange}/>
          </Segment>

          {
            errorMessageExistence
            ? <div>{errorMessageExistence}</div>
            :!isLoaded
              ?<div> Cargando ... </div>
              :<Segment>
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
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {liquidaciones.map(item => (
                  <Table.Row>
                    <Table.Cell>{item.fecha}</Table.Cell>
                    <Table.Cell>{item.razonSocial}</Table.Cell>
                    <Table.Cell>$ {item.monto}</Table.Cell>
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