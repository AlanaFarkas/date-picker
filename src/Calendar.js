import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { Container, Row, Col } from 'react-grid-system';
import { fadeIn } from 'react-animations';
import { ALL_DAYS, ALL_MONTHS } from './constants';
import { whatDateDoesTheMonthStartOn, createWeeks, createDateObjectFromSelectedDate } from './utils';
import PrevArrow from './assets/l_arrow.svg'
import NextArrow from './assets/r_arrow.svg'

const calendarFadeIn = keyframes `${fadeIn}`;

export default class Calendar extends Component {

    state = {
        year: new Date().getFullYear(),
        monthDigit: new Date().getMonth(),
        displayedDates: Object.values(ALL_MONTHS)[new Date().getMonth()],
        selectedDate: new Date(),
        months: Object.keys(ALL_MONTHS),
        displayedMonth: Object.keys(ALL_MONTHS)[new Date().getMonth()],
        dates: Object.values(ALL_MONTHS),
    };

    handleNext = () => {
        const {
            monthDigit,
            months,
            dates,
        } = this.state;

        if(monthDigit === 11) {
          return this.setState(prevState => ({
            monthDigit: 0,
            displayedMonth: months[0],
            year: prevState.year + 1
          }))
        } else {
          return this.setState(prevState => ({
            monthDigit: prevState.monthDigit + 1,
            displayedMonth: months[prevState.monthDigit + 1],
            displayedDates: dates[prevState.monthDigit + 1]
          }))
        }
    }

    handlePrev = () => {
        const {
            monthDigit,
            months,
            dates,
        } = this.state;

        if(monthDigit > 11) {
            return this.setState(prevState => ({
            monthDigit: 0,
            displayedMonth: months[monthDigit],
            year: prevState.year - 1
            }))
        } else if(monthDigit === 0) {
            return this.setState(prevState => ({
            monthDigit: 11,
            displayedMonth: months[11],
            year: prevState.year - 1
            }))
        } else {
            return this.setState(prevState => ({
            monthDigit: prevState.monthDigit - 1,
            displayedMonth: months[prevState.monthDigit - 1],
            displayedDates: dates[prevState.monthDigit - 1]
            }))
        }
    }

    handleSelectDate = (date) => {
        const {
            year,
            monthDigit,
        } = this.state;

        if(date != null) {
            this.setState({selectedDate: createDateObjectFromSelectedDate(year, monthDigit, date)})
        }
    }

    renderCalendarWeeks() {
        const {
            year,
            monthDigit,
            displayedDates
        } = this.state;

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
                        <DateCells
                            data-test={`date-cell-${number}`}
                            number={number}
                            onClick={() => this.handleSelectDate(number)}
                            key={i}>
                            <DateDigit>{number}</DateDigit>
                        </DateCells>
                    )}
                </Days>
            );
        });

        return renderedCalendarWeeks;
    }

    renderDaysOfTheWeek() {
        const dayStrings = ALL_DAYS.map((day, i) => {
          return (
                <DaysOfTheWeek data-test={`day-of-the-week-${day}`} key={i}>{day}</DaysOfTheWeek>
          )
        });
        return dayStrings;
    }

    renderChosenDate() {
        const {
            selectedDate,
            months,
        } = this.state;

        const humanWeekday = ALL_DAYS[selectedDate.getDay()];
        const humanDate = selectedDate.getDate();
        const humanMonth = months[selectedDate.getMonth()];
        const humanYear = selectedDate.getFullYear();
        const semanticSelectedDate = `${humanWeekday}, ${humanMonth} ${humanDate}, ${humanYear}`
        return (
            <HeaderDate data-test="header-date">
                <h2>Chosen date: {semanticSelectedDate}</h2>
            </HeaderDate>
        )
    }

    render() {
        const {
            year,
            displayedMonth
        } = this.state;

        return (
            <React.Fragment>
                <CalendarContainer data-test="calendar-container">
                        {this.renderChosenDate()}
                    <CalendarHeaderRow>
                        <CalendarHeader data-test="calendar-header">
                            <PrevArrowImage
                            data-test="prev-arrow-icon"
                            onClick={this.handlePrev}
                            src={PrevArrow}
                        />
                            <CalendarMonthYear>{displayedMonth} {year}</CalendarMonthYear>
                            <NextArrowImage
                                data-test="next-arrow-icon"
                                onClick={this.handleNext}
                                src={NextArrow}
                            />
                        </CalendarHeader>
                    </CalendarHeaderRow>
                <Weekdays data-test="weekdays">
                    {this.renderDaysOfTheWeek()}
                </Weekdays>
                    {this.renderCalendarWeeks()}
                </CalendarContainer>
            </React.Fragment>
        )
    }

}

const HeaderDate = styled.div`
`;

const CalendarContainer = styled(Container)`
    animation: 1s ${calendarFadeIn}
    padding: 20px;
    margin: 30px auto 0;
    border: 1px red solid;
`;

const PrevArrowImage = styled.img`
    float: left;
    width: 30px;
    cursor: pointer;
`;

const NextArrowImage = styled(PrevArrowImage)`
    float: right
`;

const CalendarHeaderRow = styled(Row)``;

const CalendarHeader = styled(Col)`
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const CalendarMonthYear = styled.h2`
    font-weight: bold;
`;

const Weekdays = styled(Row)`
    display: flex;
`;

const Days = styled(Row)`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    border: 1px blue solid;
`;

const DaysOfTheWeek = styled(Col)`
  padding-bottom: 20px;
  font-weight: bold;
  width: 100%;
`;

const DateCells = styled(Col)`
  background-color: ${props => props.number != null ? '#fce94b;' : '#ffffff;'}
  color: #01224b;
  font-weight: bold;
  box-shadow:inset 0px 0px 0px 1px #ffffff;
  width: 100px;
  height: 75px;
  cursor: ${props => props.number != null && 'pointer;'}
  transition: background-color 0.25s, color 0.25s;
  &:hover {
    background-color: ${props => props.number != null ? '#01224b;' : '#ffffff;'}
    color: #ffffff;
  }
`;

const DateDigit = styled.div`
  text-align: right;
  margin: 5px 10px 0 0;
`;


