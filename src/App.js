import React, { Component } from 'react';
import './App.css';
import calendar_icon from './assets/calendar_icon.svg';
import Input from './Input'
import styled from 'styled-components';
import CalendarContainer from './CalendarContainer';
import { chunk } from 'lodash';
import { ALL_DAYS, ALL_MONTHS } from './constants';
import { whatDateDoesTheMonthStartOn,chunkIt } from './utils';


class App extends Component {
  
  constructor(props) {
    super(props)
    
    const today = new Date();
    let monthDigit = today.getMonth();
    let monthArray = Object.keys(ALL_MONTHS);
    let datesArray = Object.values(ALL_MONTHS);
    let year = today.getFullYear();

    this.state = {
      weekdays: ALL_DAYS,
      months: monthArray,
      dates: datesArray,
      openCalendar: false,
      today: today,
      monthDigit: monthDigit,
      displayedMonth: monthArray[monthDigit],
      displayedDates: datesArray[monthDigit],
      year: year,
    }    
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
        displayedMonth: this.state.months[prevState.monthDigit + 1],
        displayedDates: this.state.dates[prevState.monthDigit + 1]
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
        displayedMonth: this.state.months[prevState.monthDigit - 1],
        displayedDates: this.state.dates[prevState.monthDigit - 1]
      }))
    }
  }

  
  render() {    
    const dayStrings = this.state.weekdays.map((day, i) => {
      return <div key={i}>{day}</div>
    });
    
    let dates = [];
    
    for(var i = 1; i < this.state.displayedDates + 1; i++) {
      dates.push(i);
    }
    
    dates = chunkIt(dates.length, whatDateDoesTheMonthStartOn(this.state.today));

    let calendarWeeks = dates.map((date, i) => {
      return (
        <WeekDiv key={i}>
          {date.map(number => <DayDiv key={number}>{number}</DayDiv>)}
        </WeekDiv>
      )
    })
    calendarWeeks.push(<div>STARTS ON: {whatDateDoesTheMonthStartOn(this.state.today)}</div>)

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
          dates={calendarWeeks}
          handleNext={this.handleNext} 
          handlePrev={this.handlePrev} 
          /> 
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

const WeekDiv = styled.div`
  border: 2px blue solid;
`;

const DayDiv = styled.div`

`;
