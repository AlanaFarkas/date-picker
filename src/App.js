import React, { Component } from 'react';
import './App.css';
import calendar_icon from './assets/calendar_icon.svg';
import Input from './Input'
import styled from 'styled-components';
import CalendarContainer from './CalendarContainer';
import { ALL_DAYS, ALL_MONTHS } from './constants';
import { whatDateDoesTheMonthStartOn, createWeeks, createDateObjectFromSelectedDate } from './utils';


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
      selectedDate: today,
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

  handleSelectDate = (date) => {
    if(date != null) {
      this.setState({selectedDate: createDateObjectFromSelectedDate(this.state.year, this.state.monthDigit, date)})
    }
  }

  render() {    
    const dayStrings = this.state.weekdays.map((day, i) => {
      return <WeekDayData key={i}>{day}</WeekDayData>
    });
    
    let dates = [];
    
    for(var i = 1; i < this.state.displayedDates + 1; i++) {
      dates.push(i);
    }
    
    dates = createWeeks(dates.length, whatDateDoesTheMonthStartOn(this.state.year, this.state.monthDigit)); 
    
    let calendarWeeks = dates.map((week, i) => {
      
      return (
        <tr key={i}>
          {week.map((number, i) => <DateCells dates={this.props.calendarWeeks} onClick={() => this.handleSelectDate(number)} key={i}>{number}</DateCells> )}
        </tr>
      )
    })

    let humanWeekday = this.state.weekdays[this.state.selectedDate.getDay()];
    let humanDate = this.state.selectedDate.getDate();
    let humanMonth = this.state.months[this.state.selectedDate.getMonth()];
    let humanYear = this.state.selectedDate.getFullYear();
    let semanticSelectedDate = <div>{humanWeekday}, {humanMonth} {humanDate}, {humanYear}</div>

   
    return (
      <div className="App">
      <h1>Choose a date</h1>
      <h2>{semanticSelectedDate}</h2>
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

const WeekDayData = styled.td`
  padding-bottom: 20px;
`;

const DateCells = styled.td`
  background-color: ${props => props.children != null ? '#fce94b;' : '#ffffff'}
  color: #01224b;
  height: 50px;
  &:hover {
    background-color: ${props => props.children != null ? '#01224b;;' : '#ffffff'}
    color: #ffffff;
  }
  `;
