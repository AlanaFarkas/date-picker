import React, { Component } from 'react';
import './App.css';
import calendar_icon from './assets/calendar_icon.svg';
import Input from './Input'
import styled from 'styled-components';
import CalendarContainer from './CalendarContainer';
import { ALL_DAYS, ALL_MONTHS } from './constants';
// ALL_MONTHS = {
//   'January': 31,
//   'February': 28,
//   'March': 31,
//   'April': 30,
//   'May': 31,
//   'June': 30,
//   'July': 31,
//   'August': 30,
//   'September': 30,
//   'October': 31,
//   'November': 30,
//   'December': 31
// }

class App extends Component {
  
  constructor(props) {
    super(props)
    
    const today = new Date();
    let monthDigit = today.getMonth();
    let monthArray = Object.keys(ALL_MONTHS);
    let year = today.getFullYear();

    this.state = {
      weekdays: ALL_DAYS,
      months: monthArray,
      openCalendar: false,
      today: today,
      monthDigit: monthDigit,
      displayedMonth: monthArray[monthDigit],
      // displayedDates: ALL_MONTHS.displayedMonth,
      year: year,
    }    
    console.log(typeof(this.state.displayedDates))
  }

  showCalendar = () => {
    return this.setState(prevState => ({
      openCalendar: !prevState.openCalendar
    }))
  }

  handleNext = () => {
    if(this.state.monthDigit === 11) {
      return this.setState(prevState => ({
        monthDigit: 0,
        displayedMonth: this.state.months[0],
        year: prevState.year + 1
      }))
    } else {
      return this.setState(prevState => ({
        monthDigit: prevState.monthDigit + 1,
        displayedMonth: this.state.months[prevState.monthDigit + 1]
      }))
    }
  }

  handlePrev = () => {
    if(this.state.monthDigit > 11) {
      return this.setState(prevState => ({
        monthDigit: 0,
        displayedMonth: this.state.months[this.state.monthDigit],
        year: prevState.year - 1
      }))
    } else if(this.state.monthDigit === 0) {
      return this.setState(prevState => ({
        monthDigit: 11,
        displayedMonth: this.state.months[11],
        year: prevState.year - 1
      }))
    } else {
      return this.setState(prevState => ({
        monthDigit: prevState.monthDigit - 1,
        displayedMonth: this.state.months[prevState.monthDigit - 1]
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
          month={this.state.displayedMonth} 
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
