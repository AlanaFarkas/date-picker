import React, { Component } from 'react';
import styled from 'styled-components';
import { ALL_DAYS, ALL_MONTHS } from './constants';
import { whatDateDoesTheMonthStartOn, createWeeks, createDateObjectFromSelectedDate } from './utils';
import PrevArrow from './assets/l_arrow.svg'
import NextArrow from './assets/r_arrow.svg'

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
                <Days key={i}>
                    {week.map((number, i) =>
                    <DateCells dates={calendarWeeks} onClick={() => this.handleSelectDate(number)} key={i}>{number}</DateCells> )}
                </Days>
            );
        });

        return renderedCalendarWeeks;
    }

    renderDaysOfTheWeek() {
        const dayStrings = ALL_DAYS.map((day, i) => {
          return <DaysOfTheWeek key={i}>{day}</DaysOfTheWeek>
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
                        <CalendarHeader>
                            <PrevArrowImage onClick={this.handlePrev} src={PrevArrow} />
                            <CalendarMonthYear>{displayedMonth} {year}</CalendarMonthYear>
                            <NextArrowImage onClick={this.handleNext} src={NextArrow} />
                        </CalendarHeader>
                            <Weekdays>{this.renderDaysOfTheWeek()}</Weekdays>
                            {this.renderCalendarWeeks()}
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

const CalendarTable = styled.div`
    width: 100%;
`;

const PrevArrowImage = styled.img`
    float: left;
    width: 30px;
`;

const NextArrowImage = styled(PrevArrowImage)`
    float: right
`;

const CalendarHeader = styled.div`
    margin-bottom: 20px;    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const CalendarMonthYear = styled.div`
    font-size: 18px;
    font-weight: bold;
`;

const Weekdays = styled.div`
    display: flex;
`;

const Days = styled.div`
    border: 1px blue solid;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`;

const DaysOfTheWeek = styled.div`
  padding-bottom: 20px;
  font-weight: bold;
  width: 100%;
`;

const DateCells = styled.div`
  background-color: ${props => props.children != null ? '#fce94b;' : '#ffffff;'}
  color: #01224b;
  font-weight: bold;
//   width: 100%;
    width: ${props => props.children === null ? '100px' : '100px'}
  height: 50px;
  cursor: ${props => props.children != null && 'pointer;'}
  transition: background-color 0.25s, color 0.25s;
  &:hover {
    background-color: ${props => props.children != null ? '#01224b;' : '#ffffff;'}
    color: #ffffff;
  }
`;


