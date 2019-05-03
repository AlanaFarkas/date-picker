import React, { Component } from 'react';
import styled from 'styled-components';
import { ALL_DAYS, ALL_MONTHS } from './constants';
import { whatDateDoesTheMonthStartOn, createWeeks, createDateObjectFromSelectedDate } from './utils';

export default class CalendarContainer extends Component {

    state = {
        year: new Date().getFullYear(),
        monthDigit: new Date().getMonth(),
        displayedDates: Object.values(ALL_MONTHS)[new Date().getMonth()],
        selectedDate: new Date(),
        months: Object.keys(ALL_MONTHS),
        today: new Date(),
        displayedMonth: Object.keys(ALL_MONTHS)[new Date().getMonth()],
        dates: Object.values(ALL_MONTHS),
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
            );
        });

        return renderedCalendarWeeks;
    }

    renderDaysOfTheWeek() {
        const dayStrings = ALL_DAYS.map((day, i) => {
          return <WeekDayData key={i}>{day}</WeekDayData>
        });

        return dayStrings;
    }

    renderChosenDate() {
        const humanWeekday = ALL_DAYS[this.state.selectedDate.getDay()];
        const humanDate = this.state.selectedDate.getDate();
        const humanMonth = this.state.months[this.state.selectedDate.getMonth()];
        const humanYear = this.state.selectedDate.getFullYear();
        const semanticSelectedDate = `${humanWeekday}, ${humanMonth} ${humanDate}, ${humanYear}`
        return <h2>{semanticSelectedDate}</h2>
    }

    render() {
        const {year, displayedMonth} = this.state;
        return (
            <React.Fragment>
                <HeaderDate>
                    {this.renderChosenDate()}
                </HeaderDate>
                <Calendar>
                    <CalendarTable>
                        <CalendarCaption>
                            <PrevButton onClick={this.handlePrev}>Prev</PrevButton>
                            <CalendarMonthYear>{displayedMonth} {year}</CalendarMonthYear>
                            <NextButton onClick={this.handleNext}>Next</NextButton>
                        </CalendarCaption>
                        <tbody>
                            <Weekdays>{this.renderDaysOfTheWeek()}</Weekdays>
                            {this.renderCalendarWeeks()}
                        </tbody>
                    </CalendarTable>
                </Calendar>
            </React.Fragment>
        )
    }

}

const HeaderDate = styled.div`
`;

const Calendar = styled.div`
    width: 700px;
    padding: 20px;
    margin: 30px auto 0;
`;

const CalendarTable = styled.table`
    width: 100%;
    table-layout: fixed;
`;

const PrevButton = styled.button`
    float: left;
`;

const NextButton = styled.button`
    float: right
`;

const CalendarCaption = styled.caption`
    margin-bottom: 20px;
`;

const CalendarMonthYear = styled.div`
    font-size: 18px;
    text-align: center;
    display: inline-block;
    font-weight: bold;
`;

const Weekdays = styled.tr`
    font-weight: bold;
`;

const WeekDayData = styled.td`
  padding-bottom: 20px;
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


