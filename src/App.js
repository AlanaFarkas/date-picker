import React, { Component } from 'react';
import './App.css';
import calendar_icon from './assets/calendar_icon.svg';
import Input from './Input'
import styled from 'styled-components';
import CalendarContainer from './CalendarContainer';
import { ALL_DAYS, ALL_MONTHS } from './constants';

class App extends Component {
  
  constructor(props) {
    super(props)
    
    const today = new Date();
    let month_number = today.getMonth();
    let month_string = ALL_MONTHS[month_number];
    let year = today.getFullYear();
    // let counter = month_number;    

    this.state = {
      weekdays: ALL_DAYS,
      months: ALL_MONTHS,
      openCalendar: false,
      today: today,
      month_number: month_number,
      month_string: month_string,
      year: year,
      // counter: counter,
    }    
  }

  showCalendar = () => {
    return this.setState(prevState => ({
      openCalendar: !prevState.openCalendar
    }))
  }

  handleNext = () => {
    if(this.state.month_number == 11) {
      return this.setState(prevState => ({
        month_number: 0,
        month_string: ALL_MONTHS[0],
        year: prevState.year + 1
      }),
      console.log(this.state.month_string)
      )
    } else {
      return this.setState(prevState => ({
        month_number: prevState.month_number + 1,
        month_string: ALL_MONTHS[prevState.month_number + 1]
      }))
    }
  }

  handlePrev = () => {
    if(this.state.month_number > 11) {
      return this.setState(prevState => ({
        month_number: 0,
        month_string: ALL_MONTHS[this.state.month_number],
        year: prevState.year - 1
      }))
    } else if(this.state.month_number == 0) {
      return this.setState(prevState => ({
        month_number: 11,
        month_string: ALL_MONTHS[this.state.month_number],
        year: prevState.year - 1
      }))
    } else {
      return this.setState(prevState => ({
        month_number: prevState.month_number - 1,
        month_string: ALL_MONTHS[prevState.month_number - 1]
      }))
    }
  }
  


  render() {    
    const dayStrings = this.state.weekdays.map((day, i) => {
        return <p key={i}>{day}</p>
    });


    return (
      <div className="App">
      <h1>Choose a date</h1>
      <InputContainerDiv>      
        <Input />
        <CalendarImg onClick={this.showCalendar} src={calendar_icon} />
      </InputContainerDiv>
      {this.state.openCalendar ? 
        <CalendarContainer 
          month={this.state.month_string} 
          year={this.state.year}
          days={dayStrings} 
          handleNext={this.handleNext} 
          handlePrev={this.handlePrev} /> 
      : null}      
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
