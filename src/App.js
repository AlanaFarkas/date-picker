import React, { Component } from 'react';
import calendar_icon from './assets/calendar_icon.svg';
import Input from './Input'
import styled from 'styled-components';
import CalendarContainer from './CalendarContainer';
import { ALL_DAYS, ALL_MONTHS } from './constants';
import { whatDateDoesTheMonthStartOn, createWeeks, createDateObjectFromSelectedDate } from './utils';


export default class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      months: Object.keys(ALL_MONTHS),
      dates: Object.values(ALL_MONTHS),
      openCalendar: false,
      today: new Date(),
      selectedDate: new Date(),
      monthDigit: new Date().getMonth(),
      displayedMonth: Object.keys(ALL_MONTHS)[new Date().getMonth()],
      displayedDates: Object.values(ALL_MONTHS)[new Date().getMonth()],
      year: new Date().getFullYear(),
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

renderHeaderInfo() {
  const humanWeekday = ALL_DAYS[this.state.selectedDate.getDay()];
  const humanDate = this.state.selectedDate.getDate();
  const humanMonth = this.state.months[this.state.selectedDate.getMonth()];
  const humanYear = this.state.selectedDate.getFullYear();
  const semanticSelectedDate = <div>{humanWeekday}, {humanMonth} {humanDate}, {humanYear}</div>

  return (
    <React.Fragment>
      <h1>Choose a date</h1>
      <h2>{semanticSelectedDate}</h2>
    </React.Fragment>
  )
}

// renderDaysOfTheWeek() {
//   const dayStrings = ALL_DAYS.map((day, i) => {
//     return <WeekDayData key={i}>{day}</WeekDayData>
//   });
//   return dayStrings;
// }

renderCalendarWeeks() {
  const { year, monthDigit, displayedDates } = this.state;
  const { calendarWeeks } = this.props;
  let dates = [];

  for(var i = 1; i < displayedDates + 1; i++) {
    dates.push(i);
  }

  dates = createWeeks(
      dates.length,
      whatDateDoesTheMonthStartOn(year, monthDigit), year, monthDigit
    );

  const renderedCalendarWeeks = dates.map((week, i) => {
    return (
      <tr key={i}>
        {week.map((number, i) =>
          <DateCells dates={calendarWeeks} onClick={() => this.handleSelectDate(number)} key={i}>{number}</DateCells> )}
      </tr>
    )
  })
  return renderedCalendarWeeks;
}

maybeRenderCalendar() {
  const {
    openCalendar,
    displayedMonth,
    year,
  } = this.state;

  if (!openCalendar) {
    return null;
  }

  return (
    <CalendarContainer
      month={displayedMonth}
      year={year}
      dates={this.renderCalendarWeeks()}
      handleNext={this.handleNext}
      handlePrev={this.handlePrev}
      />
  )
}

render() {
    return (
      <AppContainer>
        {this.renderHeaderInfo()}
        <InputContainerDiv>
          <Input onClick={this.showCalendar} />
          <CalendarImg onClick={this.showCalendar} src={calendar_icon} />
        </InputContainerDiv>
        {this.maybeRenderCalendar()}
      </AppContainer>
    );
  }

}

const AppContainer = styled.div`
  text-align: center;
`;

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

const DateCells = styled.td`
  background-color: ${props => props.children != null ? '#fce94b;' : '#ffffff;'}
  color: #01224b;
  height: 50px;
  cursor: ${props => props.children != null && 'pointer'}
  &:hover {
    background-color: ${props => props.children != null ? '#01224b;' : '#ffffff;'}
    color: #ffffff;
  }
`;
