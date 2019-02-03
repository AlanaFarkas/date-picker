import React, { Component } from 'react';
import './App.css';
import calendar_icon from './assets/calendar_icon.svg';
import Input from './Input'
import styled from 'styled-components';
import CalendarContainer from './CalendarContainer';
import { ALL_MONTHS, ALL_DAYS, TODAY, MONTH, MONTH_STRING} from './constants';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      openCalendar: false,
      month: MONTH_STRING,
    }
    
  }

  handleClick = () => {
    return this.setState(prevState => ({
      openCalendar: !prevState.openCalendar,
    }))
  }

  handleNext = () => {
    let month = TODAY.getMonth();
    let monthString = ALL_MONTHS[month + 1];
    console.log(monthString);
  }

  handlePrev = () => {
    let month = TODAY.getMonth();
    let monthString = ALL_MONTHS[month - 1];
    console.log(monthString);
  }

  render() {

    
    const dayStrings = ALL_DAYS.map((day, i) => {
        return <p key={i}>{day}</p>
    });


    return (
      <div className="App">
      <h1>Choose a date</h1>
      <InputContainerDiv>      
        <Input />
        <CalendarImg onClick={this.handleClick} src={calendar_icon} />
        {this.state.openCalendar ? 
            <CalendarContainer 
            month={this.state.month} 
            days={dayStrings} 
            handleNext={this.handleNext} 
            handlePrev={this.handlePrev} /> 
          : null}
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
