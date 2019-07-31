import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { Container, Row, Col } from 'react-grid-system';
import { fadeIn } from 'react-animations';
import { ALL_DAYS, ALL_MONTHS } from './constants';
import { whatDateDoesTheMonthStartOn, createWeeks, createDateObjectFromSelectedDate } from './utils';
import PrevArrow from './assets/l_arrow.svg'
import NextArrow from './assets/r_arrow.svg'

export default class Calendar extends Component {

    state = {
        year: new Date().getFullYear(),
        monthDigit: new Date().getMonth(),
        displayedDates: Object.values(ALL_MONTHS)[new Date().getMonth()],
        selectedDate: null,
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
        
        if (date == null) {
            return;
        }

        this.setState({selectedDate: createDateObjectFromSelectedDate(year, monthDigit, date)})
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
                <Week key={i}>
                    {week.map((number, i) =>
                        <DateCell
                            data-test={`date-cell-${number}`}
                            number={number}
                            onClick={() => this.handleSelectDate(number)}
                            key={i}
                        >
                            <DateDigit>
                                {number}
                            </DateDigit>
                        </DateCell>
                    )}
                </Week>
            );
        });

        return renderedCalendarWeeks;
    }

    renderDaysOfTheWeek() {
        const dayStrings = ALL_DAYS.map((day, i) => {
          return (
                <Weekday 
                    data-test={`day-of-the-week-${day}`} 
                    key={i}
                >
                    {day}
                </Weekday>
          )
        });
        return dayStrings;
    }

    renderChosenDate() {
        const {
            selectedDate,
            months,
        } = this.state;

        if(selectedDate == null) {
            return;
        }

        const humanDate = selectedDate.getDate();
        const humanMonth = months[selectedDate.getMonth()];
        const humanYear = selectedDate.getFullYear();
        const semanticSelectedDate = `${humanMonth} ${humanDate}, ${humanYear}`
        return (
            <HeaderDateRow data-test="header-date">
                <ChosenDate>{semanticSelectedDate}</ChosenDate>
            </HeaderDateRow>
        )

    }

    render() {
        const {
            year,
            displayedMonth
        } = this.state;

        return (
            <CalendarContainer data-test="calendar-container">
                {this.renderChosenDate()}
                <CalendarHeader data-test="calendar-header">
                    <PrevImgColumn>
                        <PrevArrowImage
                            data-test="prev-arrow-icon"
                            onClick={this.handlePrev}
                            src={PrevArrow}
                        />
                    </PrevImgColumn>
                    <CalendarMonthYear>{displayedMonth} {year}</CalendarMonthYear>
                    <NextImgColumn>
                        <NextArrowImage
                            data-test="next-arrow-icon"
                            onClick={this.handleNext}
                            src={NextArrow}
                        />
                    </NextImgColumn>
                </CalendarHeader>
                <DaysOfTheWeekRow data-test="days-of-the-week-row">
                    {this.renderDaysOfTheWeek()}                    
                </DaysOfTheWeekRow>
                    {this.renderCalendarWeeks()}
            </CalendarContainer>
        )
    }

}

const calendarFadeIn = keyframes `${fadeIn}`;

const HeaderDateRow = styled(Row)`
    animation: 1s ${chosenDateFadeIn}  
    margin-bottom: 25px;
`;

const chosenDateFadeIn = keyframes `${fadeIn}`;

const ChosenDate = styled.h2`
    margin: auto;
    text-align: center;
`;

const CalendarContainer = styled(Container)`
    animation: 1s ${calendarFadeIn}
    padding: 20px;
`;

const PrevImgColumn = styled(Col)``
const NextImgColumn = styled(PrevImgColumn)``

const PrevArrowImage = styled.img`
    float: left;
    width: 30px;
    cursor: pointer;
`;

const NextArrowImage = styled(PrevArrowImage)`
    float: right
`;

const CalendarHeader = styled(Row)`
    margin-bottom: 20px;
    justify-content: space-around;
`;

const CalendarMonthYear = styled(Col)`
    font-weight: bold;
    text-align: center;
    font-size: 20px;
`;

const DaysOfTheWeekRow = styled(Row)`
    flex-wrap: nowrap!important;
`;

const Week = styled(DaysOfTheWeekRow)``;

const Weekday = styled(Col)`
  padding-bottom: 20px;
  font-weight: bold;
  width: 100%;
  text-align: center;
`;

const DateCell = styled(Col)`
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
  margin-top: 5px;
`;


