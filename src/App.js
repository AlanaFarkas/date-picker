import React, { Component } from 'react';
import './App.css';
import calendar_icon from './assets/calendar_icon.svg';
import Input from './Input'
import styled from 'styled-components';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      openCalendar: false
    }
  }


handleClick = () => {
  return this.setState(prevState => ({
    openCalendar: !prevState.openCalendar
  }))
}




  render() {
    const htmlTable = <table>
    <tr>
      <th>Firstname</th>
      <th>Lastname</th> 
      <th>Age</th>
    </tr>
    <tr>
      <td>Jill</td>
      <td>Smith</td> 
      <td>50</td>
    </tr>
    <tr>
      <td>Eve</td>
      <td>Jackson</td> 
      <td>94</td>
    </tr>
  </table>
    return (
      <div className="App">
      <h1>Choose a date</h1>
      <InputContainerDiv>      
        <Input />
        <CalendarImg onClick={this.handleClick} src={calendar_icon} />
        {this.state.openCalendar ? htmlTable : null}
      </InputContainerDiv>
      </div>
    );
  }
}

export default App;

const InputContainerDiv = styled.div`
  display: inline-block;
  position: relative;
`;

const CalendarImg = styled.img`
  height: 25px;
  position: absolute;
  right: 3px;
  top: 3px;
`;
