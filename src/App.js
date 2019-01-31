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
    const Tab = 'Alana'
    return (
      <div className="App">
      <h1>Choose a date</h1>
      <InputContainerDiv>      
        <Input />
        <CalendarImg onClick={this.handleClick} src={calendar_icon} />
        {this.state.openCalendar ? Tab : null}
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
