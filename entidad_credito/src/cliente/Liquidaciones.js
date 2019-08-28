import React, { Component } from "react";
import {Table, Container, Statistic, Segment, Label} from 'semantic-ui-react';
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

       startDate: new Date(),
       endDate: new Date(),
      
      }
      
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
      }
    
    render(){
        const { column, data, direction } = this.state;
        
        return(
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
                <Label pointing='right' color='yellow'>Desde</Label>
                  <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleChangeStartDate}
                  />
                  <Label pointing='right' color='yellow'>Hasta</Label>
                  <DatePicker
                  selected={this.state.endDate}
                  onChange={this.handleChangeEndDate}
                  />
                </Segment>
              
                <Segment>
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
                  </Table>
                </Segment>
            </Container>
    
            
        );
    }
        
}

export default Liquidaciones